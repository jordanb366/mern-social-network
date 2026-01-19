[## To Dos

**Notes**

- Needed to add `--openssl-legacy-provider` to React start/build scripts; app runs now. Research which npm packages require updates for the current React.
- Add comments to client side soon.

---

### Client

- [ ] **Display Reactions under thoughts**
  - **Priority:** High · **Owner:** Unassigned · **Estimate:** 2–4h · **Status:** Todo
  - **Acceptance Criteria:** Reactions render under each thought with counts; adding/removing a reaction updates the UI without a full page reload.
  - **Subtasks:**
    - [ ] Backend: ensure [server/controllers/thoughtController.js](server/controllers/thoughtController.js) returns reactions with thoughts.
    - [ ] API: verify/update [server/routes/api/thoughtRoutes.js](server/routes/api/thoughtRoutes.js).
    - [ ] Client: update components in `client/src/pages` and `client/src/components` to render reaction items and counts.
    - [ ] QA: manual tests for add/remove reaction flows.

- [ ] **Add comments to client codebase**
  - **Priority:** Medium · **Owner:** Unassigned · **Estimate:** 1–2h · **Status:** Todo
  - **Acceptance Criteria:** Key components and pages have brief header comments (purpose, props, side effects).
  - **Subtasks:**
    - [ ] Add JSDoc-style comments to `client/src/components` and `client/src/pages`.
    - [ ] Optional: add `CLIENT_DOCS.md` with component overview.

- [ ] **Finish styling: Thoughts & Reactions layout**
  - **Priority:** Medium · **Owner:** Unassigned · **Estimate:** 4–8h · **Status:** Todo
  - **Acceptance Criteria:** Thoughts cards are visually distinct; reactions display as badges or a compact list; layout is responsive.
  - **Subtasks:**
    - [ ] Create/adjust CSS classes (card, badge, grid).
    - [ ] Update components to use classes and verify mobile layout.
    - [ ] Capture before/after screenshots for review.

---

### Server

- [ ] **Review and fix thought controllers / query patterns**
  - **Priority:** High · **Owner:** Unassigned · **Estimate:** 3–5h · **Status:** Todo
  - **Acceptance Criteria:** Controller queries fetch thoughts and associated reactions efficiently by thought id; endpoints return required fields only.
  - **Subtasks:**
    - [ ] Audit `server/controllers/thoughtController.js` for query efficiency and proper population of `reactions`.
    - [ ] Add/update tests for thought endpoints.
    - [ ] Document API changes in `server/README.md` or `API.md`.

- [ ] **Clean up unused code**
  - **Priority:** Low · **Owner:** Unassigned · **Estimate:** 1–3h · **Status:** Todo
  - **Acceptance Criteria:** Remove dead exports/imports and console logs; app builds without warnings from cleaned modules.
  - **Subtasks:**
    - [ ] Run linter/import-checker, remove unused code.
    - [ ] Commit cleanup in a dedicated PR.

---

### Features

- [ ] \*\* Work on the users "profile" page - UI updates, show users thoughts in the dashboard as well
- **Acceptance Criteria:** users "profile" page - UI updates, show users thoughts in the dashboard as well

### Repo / Process

- [ ] **Add issue & PR templates**
  - **Priority:** Low · **Owner:** Unassigned · **Estimate:** 0.5–1h · **Status:** Todo

- [ ] **Create milestone: v0.1 (UI polish)**
  - **Priority:** Low · **Owner:** Unassigned · **Estimate:** 0.5–1h · **Status:** Todo]
