# AGENTS.md — ReBloom Antigravity Execution Guide

## 1. Mandatory Reading Order (Read First)
Before inspecting any code or executing any task, you **MUST** read the project documentation in this exact sequence to understand the product flow, visual standards, and existing architecture:

1. **`PRD.md`**: Read first to understand the ReBloom business model (Pre-Order & Cash on Delivery only), the 3-page user journey (`index.html` -> `product.html` -> `receipt.html`), the `sessionStorage` data contract, and the WhatsApp auto-copy checkout flow.
2. **`design_system.md`**: Read second to lock in the UI/UX specifications, hardcoded hex color palette (`#E3475D`, `#24CC63`, `#F5B0C4`), typography rules (`Telma` and `Figtree` at `40px` Judul / `20px` Keterangan), and component layouts (color swatches, quantity stepper, custom note input, and cart button).
3. **`architecture.md` & `variables.md`**: Read third to review the DOM hierarchy and existing `snake_case` class, ID, and JavaScript variable names before touching the codebase.

---

## 2. Core Coding Invariants (Strictly Enforced)
When writing or modifying `index.html`, `product.html`, `receipt.html`, `assets/css/style.css`, `assets/css/product.css`, `assets/css/receipt.css`, or `assets/js/script.js`, obey these rules without exception:

- **Pure Vanilla Stack**: Use only standard HTML5, CSS3, and vanilla JavaScript. No external frameworks or build tools.
- **100% `snake_case`**: Every HTML `class`, HTML `id`, JS variable, JS function, and storage key must use `snake_case`. Never use `kebab-case` or `camelCase`.
- **Zero `:root` or CSS Variables**: Never use `:root` or `var(--...)`. Hardcode all hex colors and font families directly onto CSS rules.
- **Font Awesome 6.4.0 Only**: Use Font Awesome classes (`<i class="fa-solid ..."></i>` or `<i class="fa-brands ..."></i>`) for all icons. Never use inline `<svg>` tags.
- **Zero Backend / Payment Gateways**: Keep the flow strictly client-side Pre-Order & COD redirecting to WhatsApp (`6282132829795`).

---

## 3. Step-by-Step Execution Workflow
Follow this exact workflow for every task:

1. **Context Initialization**: Read `PRD.md` and `design_system.md` completely.
2. **Codebase Audit**: Inspect the target HTML, CSS, and JS files alongside `architecture.md` and `variables.md`.
3. **Implementation**: Execute the requested code changes cleanly, adhering to all `design_system.md` visuals and `snake_case` rules.
4. **Mandatory Post-Task Documentation Updates**:
   - **Update `variables.md`**: Register every newly added, renamed, or modified HTML `class`, HTML `id`, and JS variable/function in its respective table.
   - **Update `changelog.md`**: Append a clear, structured summary of all file modifications, UI additions, and logic updates made during the session.
   - **Update `architecture.md`** *(if structural changes occur)*: Keep the DOM tree diagram synchronized with the latest HTML layout.