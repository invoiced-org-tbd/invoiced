# Invoiced

A Brazil-only product for freelancers and independent professionals (e.g. developers, designers) who operate as a **PJ** (Pessoa Jurídica) and work for offshore clients. Helps them manage PJ finances — taxes, expenses, invoicing — and the contracts behind offshore work paid in foreign currencies.

## Language

**User**:
An authenticated person who owns one workspace in the product.
_Avoid_: Account (when meaning the login identity — use **User** for the product account and reserve "account" for auth-provider linkage if needed)

**Company**:
The User's own Brazilian PJ — the legal entity that issues invoices. Holds the User's business identity: **Legal name**, **Fantasy name**, **CNPJ**, Brazilian **address**, and a general contact **email** for the PJ. Exactly one per User; the product is not designed for Users with multiple PJs. The profile must be complete before creating **Contracts** or **Invoices** — no partial draft state. Created once per User, edited freely thereafter; never deleted.
_Avoid_: Workspace, organization, business (as a standalone synonym — be explicit: **Company** is the PJ)

**Legal name** (*razão social*):
The official registered name of the User's Company, as on the CNPJ. Required. Used on invoice PDFs, **Send invoice email**, and any legally binding output.
_Avoid_: Name (alone — specify **Legal name** or **Fantasy name**)

**Fantasy name** (*nome fantasia*):
The trade or brand name of the User's Company. Required in the data model; may match the **Legal name** when the User has no separate trade name. Setup may offer a "same as legal name" control that copies **Legal name** into **Fantasy name**. Used for in-app labels (e.g. sidebar) and, when invoice file naming includes a company name segment, as the name token — falling back to **Legal name** when both are the same.
_Avoid_: Display name, trade name (as standalone synonyms — use **Fantasy name**)

**CNPJ**:
The Brazilian federal tax identifier for the User's Company. Required on **Company** from setup. Validated and stored normalized (digits only). Shown on invoice PDFs and **Send invoice email** alongside **Legal name**. Immutable after **Company** is created; a different **CNPJ** means a different PJ and is out of scope for in-app edit (future account migration may be offered).
_Avoid_: Tax ID, company number (generic — use **CNPJ**)

**Company address**:
The Brazilian registered address of the User's **Company**, stored separately from the **Company** row. Required: CEP (`postalCode`, 8 digits), logradouro (`street1`), número (`number`, including `S/N` when applicable), cidade (`city`), UF (`state`, 2-letter code). Optional: complemento (`street2`). Country is always Brazil — implicit, not user-editable. Bairro and CEP auto-fill are out of scope for MVP.
_Avoid_: Address (alone — specify **Company address** vs client address on a **Contract**)

**Contract**:
The User's billing arrangement with a **Contract Client** — e.g. a US company paying the User's **Company** for offshore work. Holds the **Contract Client** details, the User's **role** and **rate** on that engagement, and the **invoice recurrence** schedule (billing days and percentage splits). A User may have many **Contracts**, including multiple for similarly named clients — duplicate **Client organization names** are allowed. On create, the system warns (does not block) if an existing **Client organization name** is similar: compare names lowercased with whitespace removed (e.g. `acME InC` matches `acmeinc`). A returning client may use a new **Contract** or reactivate an **Inactive Contract** — User's choice. Always reflects current billing terms when edited; previously issued **Invoices** are unaffected because they use snapshotted data. Has an **active** flag — Users deactivate ended engagements; there is no user-facing delete. Create/edit wizard for MVP: **Contract role** → **Contract Client** → **Invoice recurrence** (no auto-send step).
_Avoid_: Customer (alone — use **Contract Client** for the org, **Contract** for the billing setup); delete (for **Contract** — use deactivate / mark inactive)

**Contract role**:
How the User is described on a **Contract** (e.g. "Senior Developer") together with the billing **rate** for that engagement — e.g. $2,400/month. The rate is a **monthly rate** in **Invoice currency** for MVP: the total billed to that client per month. **Invoice recurrence** splits divide the monthly rate by percentage and billing days (e.g. 50% on day 5 + 50% on day 20 → $1,200 + $1,200).
_Avoid_: Job title (alone — **Contract role** includes both description and rate)

**Invoice recurrence**:
The schedule on a **Contract** defining when and how much to bill — e.g. day 5 and day 20 each month at 50%/50%, producing $1,200 + $1,200 from a $2,400 monthly rate. Each slot is a candidate billing event. For MVP, the User manually generates an **Invoice** for a chosen slot; amount and issue date are pre-filled from the slot (rate × percentage, slot date in the current or next billing month). Each slot may be invoiced once per calendar month; the system blocks duplicate slot + month combinations. Slot identity for deduplication and **Invoice** delete side effects is day-of-month plus billing month — not recurrence row id (row ids change when **Contract** recurrence is edited). Custom amounts outside the schedule are out of scope for MVP.

Validation: at least one slot; percentages must sum to 100%; no duplicate day-of-month within a **Contract**; day 1–31. When a slot day exceeds the length of the target month (e.g. day 31 in February), the issue date uses the **last day of that month** (28th or 29th).
_Avoid_: Billing schedule (as a standalone synonym — use **Invoice recurrence**)

**Invoice**:
A commercial payment document — not a Brazilian fiscal note (NFSe/NFe) for MVP — that the User's **Company** issues against a **Contract** for a specific billing event. Records issue date, line items, and amounts in **Invoice currency** the User sends to the offshore **Contract Client** as a PDF to get paid. Always tied to exactly one **Contract**. Immutable once issued — no edit; delete and re-create to fix mistakes.

At creation, everything used to display the **Invoice** PDF is snapshotted — no live reads from **Company**, **Contract**, or **Invoice configuration** when rendering PDFs. That includes: **Company** (+ **Company address**), **Contract Client** (+ **Contract Client address**, **Invoice recipient**), **Contract role**, **Invoice configuration** (+ **Invoice number** at issue), **Invoice currency**, line items, **Invoice recurrence** slot (day-of-month), billing month, and issue date.

**Send invoice email** snapshhots the chosen **Email template** (subject and rendered body) at send time — not at **Invoice** creation.

Deleting an **Invoice** soft-removes it, frees the linked **Invoice recurrence** slot for that calendar month (User may re-generate), and does not reuse the **Invoice number** — gaps in the sequence are kept for audit purposes.

The **file name** is computed at creation from the snapshotted **Invoice configuration** and stored on the **Invoice**; it is immutable.

The snapshotted issuer ("from") block on the PDF shows **Legal name** (primary), **Fantasy name** only when it differs from **Legal name**, formatted **CNPJ**, full **Company address**, and **Company** contact **email**.

The snapshotted recipient ("to") block shows **Client organization name** (primary), **Invoice recipient name** (e.g. "Attn: …"), **Invoice recipient email**, and **Contract Client address**.
_Avoid_: Bill, receipt, fiscal note, NFSe (for MVP scope)

**Invoice currency**:
The currency of **Contract** rates and **Invoice** line items — offshore commercial amounts (USD for MVP). Stored as a currency code on **Contract** so other currencies can be added later without rework. Distinct from **PJ currency**, which is always BRL.
_Avoid_: Currency (alone — specify **Invoice currency** vs **PJ currency**)

**PJ currency**:
The currency of the User's **Company** domestic finances — taxes, expenses, cashflow, and other PJ-side amounts. Always BRL, now and after MVP. Not used on commercial **Invoices** to offshore **Contract Clients**.
_Avoid_: Base currency (alone — use **PJ currency** or **Invoice currency** explicitly)

**Invoice configuration**:
User-level settings for how **Invoices** are numbered and named — prefix, suffix, optional date segments, optional **Fantasy name** in the file name, and the sequential counter. Set up on first **Contract** create if not already configured; editable thereafter in Settings. Global across all **Contracts** for MVP — not per **Contract Client**.
_Avoid_: Invoice settings (alone — use **Invoice configuration**)

**Invoice number**:
The global sequential counter on **Invoice configuration**, incremented on each **Invoice** creation and snapshotted on the **Invoice**. Shown on the PDF; never reused — gaps remain when an **Invoice** is deleted.
_Avoid_: Sequence, counter (alone — use **Invoice number**)

**Contract Client**:
The counterparty on a **Contract** — typically the offshore employer or client organization the User invoices. Stored per contract; not the User's **Company**. Includes **Client organization name** and the **Invoice recipient** who receives **Invoice** PDFs by email.
_Avoid_: Company (when meaning the client)

**Client organization name**:
The name of the **Contract Client**'s organization — e.g. the offshore employer on a contract. Shown on invoice PDFs in the "to" block and in contract UI. Not the User's **Company**; code still uses `companyName` until renamed. Duplicate names across **Contracts** are allowed. On **Contract** create, the UI warns (non-blocking, FE-only) if a normalized match exists on any loaded **Contract** — compare lowercased with whitespace removed (e.g. `acME InC` vs `acmeinc`).
_Avoid_: Company name (when meaning the client — use **Client organization name**; reserve **Company** for the User's PJ)

**Contract Client address**:
The international address of the **Contract Client** on a **Contract**. Required at create — the only purpose of a **Contract** today is to generate **Invoices**. Same field shape as other addresses (street, number, city, state, postal code, country); country is user-selected, default US for MVP. No country-specific validation beyond required fields for MVP.
_Avoid_: Client address (alone — use **Contract Client address** vs **Company address**)

**Invoice recipient**:
The person at the **Contract Client** org who receives **Invoices** — e.g. the accounting manager or whoever the User normally emails invoices to. Stored as name and email on **Contract Client**. One recipient per **Contract** for MVP.
_Avoid_: Responsible contact, responsible email, billing contact (generic — use **Invoice recipient**)

**Invoice line item**:
A single billed row on an **Invoice** — description and amount in **Invoice currency**. For MVP recurrence-generated **Invoices**, one line per **Invoice**: description from **Contract role**, amount from rate × **Invoice recurrence** slot percentage (e.g. "Senior Developer", $1,200).
_Avoid_: Line item (alone in code — use **Invoice line item**)

**Email template**:
A User-level reusable subject and body for **Invoice** emails, with variables (e.g. **Invoice recipient** name, issue date). Required before **Send invoice email** is available; configured in Settings → Automations. Snapshotted when **Send invoice email** runs — not at **Invoice** creation.
_Avoid_: Email (alone — specify **Email template** vs the send action)

**Send invoice email**:
The manual action of emailing an issued **Invoice** PDF to the **Invoice recipient** using an **Email template**. Snapshhots the template at send time. Distinct from **Invoice auto-send**, which is post-MVP. **Download invoice** is always available without a template. If the User has one **Email template**, it is used automatically; if multiple, the User picks at send time.
_Avoid_: Send to accounting, auto-send (for this manual action)

**Invoice auto-send**:
Post-MVP automation that emails **Invoices** on a schedule when a recurrence slot comes due. Not in MVP — MVP is manual generation, manual **Download invoice**, and optional **Send invoice email** when an **Email template** exists.
_Avoid_: Auto-send (alone without "Invoice" prefix when distinguishing from manual send)

**Inactive Contract**:
A **Contract** the User has marked inactive — e.g. an ended client engagement. Not deleted; retained for **Invoice** history and audit. The UI can filter active vs inactive **Contracts**; no hard delete or cascade removal. Behaves like an active **Contract** in every way except new **Invoices** cannot be generated. Can be reactivated at any time.
_Avoid_: Deleted contract, archived contract (use **Inactive Contract** / active flag)

## Flagged ambiguities

- **Code vs domain — Company names**: Domain requires separate **Legal name** and **Fantasy name** columns; implementation not yet aligned.
- **Code vs domain — CNPJ**: Required on **Company** at setup; not in schema yet.
- **Code vs domain — Company snapshot on Invoice**: Domain requires snapshotting **Company** at invoice creation; implementation currently reads live **Company** at PDF/email time.
- **Optional compliance fields**: Additional PJ registrations (e.g. **Inscrição Municipal** for ISS) are out of scope for now. Some product actions may later require them; both FE and BE will block those actions and surface a prompt to complete the missing field.
- **Code vs domain — Client organization name**: Domain term is **Client organization name**; code/UI still use `companyName` / "Company Name".
- **Code vs domain — Invoice currency**: Domain stores currency on **Contract** (USD for MVP); code has no currency field and formats amounts as USD implicitly.
- **Code vs domain — Recurrence slot deduplication**: Domain blocks one **Invoice** per day-of-month + billing month per **Contract**; code has no duplicate check and has no slot linkage on **Invoice**.
- **Custom invoices**: Ad-hoc **Invoices** with user-defined amounts outside **Invoice recurrence** — deferred post-MVP.
- **Code vs domain — Invoice delete side effects**: Domain frees day-of-month slot + billing month on delete; code soft-deletes only with no slot linkage or slot release.
- **Code vs domain — Invoice recipient**: Domain term is **Invoice recipient** (name + email); code uses `responsibleName` / `responsibleEmail`.
- **Code vs domain — Invoice file name token**: Domain uses **Fantasy name** from **Company** when enabled; code uses **Client organization name** from the contract.
- **Code vs domain — Invoice PDF recipient block**: Domain includes **Client organization name**, **Invoice recipient** name and email, and client address; code omits recipient name from the PDF party.
- **Code vs domain — Invoice snapshot scope**: Domain snapshotted fields include **Company**, **Contract role**, recurrence slot + billing month, and **Invoice currency**; code snapshots **Contract Client** and **Invoice configuration** only (plus line items on the **Invoice**).
- **Code vs domain — Send invoice email**: Domain uses **Send invoice email** (manual, requires **Email template**, template snapshotted at send); code gates send on contract **Invoice auto-send** config.
- **Code vs domain — Contract lifecycle**: Domain uses **active** flag and "mark inactive" (no user-facing delete); code hard-deletes **Contracts** with cascade.
- **Code vs domain — Contract wizard**: Domain wizard ends at **Invoice recurrence**; code includes **Invoice auto-send** step.
- **Code vs domain — Recurrence day clamping**: Domain clamps issue date to last day of month when slot day exceeds month length; code does not clamp.
- **Code vs domain — Similar client org name warning**: Domain warns on create (FE-only, non-blocking) when normalized **Client organization name** matches a **Contract** already in the list; not implemented.
