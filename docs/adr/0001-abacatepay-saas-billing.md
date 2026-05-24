---
status: accepted
date: 2026-05-24
---

# AbacatePay SaaS billing and plan entitlements

Invoiced charges users for SaaS plans only (not client invoice payments). Payments use AbacatePay subscription checkouts (hosted redirect, card only), with `@abacatepay/rest` and `@abacatepay/types`. Subscription state is driven exclusively by verified webhooks (`ABACATEPAY_WEBHOOK_SECRET`); return URLs are UX only. AbacatePay customers are created lazily on first checkout; link users via `abacatepayCustomerId` and `userId` in checkout metadata.

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
