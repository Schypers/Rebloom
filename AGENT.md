# AGENTS.md — ReBloom Antigravity Execution Guide

## 1. Mandatory Reading Order (Read First)
Before inspecting any code or executing any task, you **MUST** read the project documentation in this exact sequence to understand the product flow, visual standards, and existing architecture:

1. **`PRD.md`**: Read first to understand the ReBloom business model (Pre-Order & Cash on Delivery only), the 3-page user journey (`index.html` -> `product.html` -> `receipt.html`), the `localStorage` (`rebloom_cart`) data contract, and the WhatsApp Pre-Order COD checkout flow.
2. **`Design_System.md`**: Read second to lock in the UI/UX specifications, hardcoded hex color palette (`#e03e52`, `#c83244`, `#1bb55c`, `#eafaf1`, `#c8f0d8`, `#15803d`, `#fdecef`, `#f6f6f6`, `#ffffff`, `#eeeeee`, `#1a1a1a`, `#757575`), typography rules (`Telma` and `Figtree`), and dual-state cart component specifications (empty cart card, cart item cards with steppers and editable notes, and sticky order summary).
3. **`architecture.md` & `variables.md`**: Read third to review the DOM hierarchy, two-column split layout grid mechanics (`1.35fr 1fr`), decoupled 1-to-1 page-to-script architecture, and existing `snake_case` class, ID, and JavaScript variable names before touching the codebase.

---

## 2. Core Coding Invariants (Strictly Enforced)
When writing or modifying `index.html`, `product.html`, `receipt.html`, `assets/css/style.css`, `assets/css/product.css`, `assets/css/receipt.css`, `assets/js/script.js`, `assets/js/product.js`, or `assets/js/receipt.js`, obey these rules without exception:

- **Pure Vanilla Stack**: Use only standard HTML5, CSS3, and vanilla ES6+ JavaScript. No external frameworks or build tools.
- **Strict Page-to-Script Isolation**:
  - `index.html` loads ONLY `assets/js/script.js`.
  - Product pages (`product.html`, `product_2.html`, `product_3.html`) load ONLY `assets/js/product.js`.
  - `receipt.html` loads ONLY `assets/js/receipt.js`.
  - Strictly avoid catch-all bundles, duplicate event listeners, or cross-page dead code.
- **Product Gallery & Multi-Page Navigation**:
  - Each product features a dedicated page and standardized 4-photo gallery set (`Product_{N}.jpg`, `Product_{N}_Desk.jpg`, `Product_{N}_Makro.jpg`, `Product_{N}_Black.jpg`).
  - Gallery thumbnail clicks execute the Farthest-Left Queue Rotation (promotes clicked thumb to main preview, shifts old preview to index 0, pushes unclicked items right).
  - Pack switching via `.rel_btn` executes real page navigation (`window.location.href`).
- **100% `snake_case`**: Every HTML `class`, HTML `id`, data attribute (`data-*`), JS variable, JS function, and storage key must strictly use `snake_case`. Never use `kebab-case` or `camelCase`. Exception: Standard Font Awesome class names (such as `fa-solid`, `fa-cart-shopping`) retain official syntax.
- **Zero `:root` or CSS Variables**: Never use `:root` or `var(--...)`. Hardcode all hex colors and pixel/rem dimensions directly onto CSS rules.
- **Font Awesome 6.4.0 Only**: Use Font Awesome classes (`<i class="fa-solid ..."></i>`, `<i class="fa-regular ..."></i>`, `<i class="fa-brands ..."></i>`) for all icons. Never use inline `<svg>` tags.
- **Zero Backend / Payment Gateways**: Keep the flow strictly client-side Pre-Order COD persisted in `localStorage` and redirecting directly to WhatsApp (`6282132829795`).

---

## 3. Step-by-Step Execution Workflow
Follow this exact workflow for every task:

1. **Context Initialization**: Read `PRD.md` and `Design_System.md` completely.
2. **Codebase Audit**: Inspect the target HTML, CSS, and JS files alongside `architecture.md` and `variables.md`.
3. **Implementation**: Execute the requested code changes cleanly, adhering to all `Design_System.md` visuals, 1-to-1 script boundaries, and `snake_case` rules.
4. **Mandatory Post-Task Documentation Updates**:
   - **Update `variables.md`**: Register every newly added, renamed, or modified HTML `class`, HTML `id`, and JS variable/function in its respective table.
   - **Update `changelog.md`**: Append a clear, structured summary of all file modifications, UI additions, and logic updates made during the session.
   - **Update `architecture.md`**: Keep the DOM tree diagram and decoupled script documentation synchronized with the latest implementation.
