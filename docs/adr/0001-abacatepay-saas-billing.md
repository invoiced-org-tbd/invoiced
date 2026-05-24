---
status: accepted
date: 2026-05-24
---

# AbacatePay SaaS billing and plan entitlements

Invoiced charges users for SaaS plans only (not client invoice payments). Payments use AbacatePay subscription checkouts (hosted redirect, card only), with `@abacatepay/rest` and `@abacatepay/types`. Subscription state is driven exclusively by **verified webhooks** (see [Webhook ingestion](#webhook-ingestion)); return URLs are UX only. AbacatePay customers are created lazily on first checkout; link users via `abacatepayCustomerId` and `userId` in checkout metadata.

## Webhook ingestion

Verified webhooks are the only source of truth for paid subscription state. Implementers must satisfy all of the following before applying state transitions on the subscription record (keyed by `userId`, `abacatepayCustomerId`, and `abacatepaySubscriptionId`):

1. **Verify authenticity** — AbacatePay sends two checks on every delivery; both must pass:
   - Query param `webhookSecret` must equal `ABACATEPAY_WEBHOOK_SECRET`.
   - Header `X-Webhook-Signature` must match an HMAC-SHA256 (base64) of the **raw request body** (timing-safe compare). AbacatePay signs with their platform public key, not the webhook secret.
2. **Idempotency by event id** — Persist each processed webhook's top-level `id` (e.g. `log_abc123xyz`) in a deduplication table. Before handling, look up that id; if already stored, respond `200` and skip processing.
3. **Ordering by subscription timestamp** — On the subscription record, store `lastWebhookSubscriptionUpdatedAt` (ISO-8601 from `data.subscription.updatedAt`). Apply a state transition only when the incoming event's `data.subscription.updatedAt` is **strictly newer** than the stored value (or the field is unset).
4. **Duplicate and out-of-order behavior**:
   - **Duplicate** (same event `id` seen again, e.g. AbacatePay retry): ignore; return `200`.
   - **Out-of-order** (`data.subscription.updatedAt` ≤ `lastWebhookSubscriptionUpdatedAt`): reject the transition; return `200` without mutating subscription state (log for observability).
   - **Newer event**: process inside a transaction — update subscription fields, insert event `id`, advance `lastWebhookSubscriptionUpdatedAt`.

Resolve the local user from checkout metadata `userId` and/or `data.customer.id` → `abacatepayCustomerId`. Respond `200` only after persistence succeeds so retries remain safe.

Example payload fields (from AbacatePay subscription webhooks):

```json
{
  "id": "log_abc123xyz",
  "event": "subscription.completed",
  "data": {
    "subscription": {
      "id": "subs_…",
      "updatedAt": "2024-12-06T20:00:05.000Z"
    },
    "customer": { "id": "cust_…" }
  }
}
```

Plans are **Starter** (R$ 19,90/mo, `ABACATEPAY_PRODUCT_STARTER`) and **Pro** (R$ 39,00/mo, `ABACATEPAY_PRODUCT_PRO`). New users get a **30-day trial** starting on first visit to `/app` (`trialing`, `trialEndsAt`). Trial offers near-full product access with abuse caps: **1 contract**, **2 invoices total**. After trial without an active subscription, the account is **read-only** (view data, no mutations). Users may subscribe during trial; on `active`, trial caps lift and paid entitlements apply.

**Starter → Pro upgrade** is supported in v1 via AbacatePay change-plan; downgrades are not. Failed renewals enter **7-day grace** (`past_due`) with in-app banner, then read-only. Cancellation is **at period end**; access remains until `currentPeriodEnd`, then read-only. Checkout entry points: `/app/subscribe` (paywall, plan picker) and Settings → Billing & Plans (manage, upgrade, history).

## Plan entitlements

| Dimension | Trial | Starter | Pro |
|-----------|-------|---------|-----|
| Contracts (active) | 1 | 1 | Unlimited |
| Invoices | 2 total | 4 / calendar month | Unlimited |
| Recurrence on contracts | Yes | Yes | Yes |
| Auto-send (`contractAutoSend`) | No | No | Yes |
| Email templates | Yes | Up to 3 | Unlimited |
| Manual send (client + accounting) | Yes | Yes | Yes |
| List filters / search | Yes | Yes | Yes |
| Support tier | Standard | Standard | Standard |

Invoice month boundaries use **America/São_Paulo**. Enforce limits in server functions via a shared entitlements module; surface `PlanLimitError` with CTAs to `/app/subscribe` or Pro upgrade.

## Environment

- `ABACATEPAY_API_KEY`
- `ABACATEPAY_WEBHOOK_SECRET`
- `ABACATEPAY_PRODUCT_STARTER`
- `ABACATEPAY_PRODUCT_PRO`

## Out of scope for v1

- Client invoice payments through AbacatePay
- PIX on subscriptions
- Business tier / plan downgrades
- Support SLA differentiation
- Gating list filters by plan

## Marketing alignment

Update landing/pricing copy: paid Starter (not free), remove Business tier and “suporte prioritário”, describe limits above instead of “filtros avançados” as a plan split.
