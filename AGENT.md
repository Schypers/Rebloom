# AGENT.md — ReBloom Antigravity Execution Guide

## 1. Mandatory Reading Order (Read First)
Before inspecting any code or executing any task, you **MUST** read the project documentation in this exact sequence to understand the product flow, visual standards, existing architecture, and bilingual i18n system:

1. **`PRD.md`**: Read first to understand the ReBloom business model (Pre-Order & Cash on Delivery only), the bilingual English (`ENG`, default) / Indonesian (`IDN`) localization system, the `localStorage` state contracts (`rebloom_cart` and `rebloom_lang`), the 3-page user journey (`index.html` -> `product.html` -> `receipt.html`), and the WhatsApp Pre-Order COD checkout flow.
2. **`Design_System.md`**: Read second to lock in the UI/UX specifications, hardcoded hex color palette (`#e03e52`, `#c83244`, `#1bb55c`, `#eafaf1`, `#c8f0d8`, `#15803d`, `#fdecef`, `#f6f6f6`, `#ffffff`, `#eeeeee`, `#1a1a1a`, `#757575`), `.lang_switch` capsule styling, typography rules (`Telma` and `Figtree`), and dual-state cart component specifications.
3. **`architecture.md` & `variables.md`**: Read third to review the DOM hierarchy, two-column split layout grid mechanics (`1.35fr 1fr`), decoupled 1-to-1 page-to-script architecture, and existing `snake_case` class, ID, and JavaScript variable names before touching the codebase.

---

## 2. Core Coding Invariants (Strictly Enforced)
When writing or modifying `index.html`, `product.html`, `product_2.html`, `product_3.html`, `receipt.html`, `assets/css/style.css`, `assets/css/product.css`, `assets/css/receipt.css`, `assets/js/script.js`, `assets/js/product.js`, or `assets/js/receipt.js`, obey these rules without exception:

- **Pure Vanilla Stack**: Use only standard HTML5, CSS3, and vanilla ES6+ JavaScript. No external frameworks, bundlers, or third-party i18n libraries.
- **Strict Page-to-Script Isolation**:
  - `index.html` loads ONLY `assets/js/script.js`.
  - Product pages (`product.html`, `product_2.html`, `product_3.html`) load ONLY `assets/js/product.js`.
  - `receipt.html` loads ONLY `assets/js/receipt.js`.
  - Strictly avoid catch-all bundles, duplicate event listeners, or cross-page dead code.
- **Bilingual Translation (i18n) Engine**:
  - English (`ENG`) is the default language across all pages; Indonesian (`IDN`) is the alternate.
  - Active language is persisted in `localStorage` under `rebloom_lang`.
  - All page templates initialize `.lang_switch` with `ENG` active by default:
    ```html
    <div class="lang_switch">
      <button type="button" class="lang_btn" data-lang="IDN">IDN</button>
      <button type="button" class="lang_btn active" data-lang="ENG">ENG</button>
    </div>
    ```
  - Use `data-i18n="key"` for static content and `data-i18n-placeholder="key"` for input placeholders.
  - Translation functions must never destroy nested `<i>` icons or dynamic `<span>` elements (counters, prices). Wrap adjacent text in dedicated `<span>` elements with `data-i18n`.
- **Product Gallery & Multi-Page Navigation**:
  - Each product features a dedicated page and standardized 4-photo gallery set (`Product_{N}.jpg`, `Product_{N}_Desk.jpg`, `Product_{N}_Makro.jpg`, `Product_{N}_Black.jpg`).
  - Gallery thumbnail clicks execute the Farthest-Left Queue Rotation (promotes clicked thumb to main preview, shifts old preview to index 0, pushes unclicked items right).
  - Pack switching via `.rel_btn` executes real page navigation (`window.location.href`).
- **100% `snake_case`**: Every HTML `class`, HTML `id`, data attribute (`data-*`), CSS custom property (`--snake_case`), translation dictionary key, JS variable, JS function, and storage key must strictly use `snake_case`. Standard Font Awesome classes (`fa-solid`, `fa-cart-shopping`) retain official syntax.
- **Centralized `:root` Token Architecture**: All brand colors, surface colors, typography families, font-size scales, spacing steps, border radii, shadows, and layout limits must be declared as CSS custom properties in `:root` inside `assets/css/style.css` using `--snake_case` names (e.g. `--color_primary`, `--font_secondary`, `--text_heading`, `--radius_pill`).
- **Scalable `rem` Typography & Layout**: All typography (`font-size`) must use scalable `rem` units anchored to a `16px` root base (`html { font-size: 100% }`), with fluid `clamp()` used for major display titles. Fixed `px` values are strictly reserved for hairline borders (`1px`/`2px`) and pill radii (`9999px`).
- **Full Responsive Viewport Adaptation**: Zero horizontal overflow (`scrollWidth <= innerWidth`) across all viewports from 360px to 1440px+, with specific visual optimization for iPhone 16 (393px × 852px) and a mobile navigation drawer triggered via `.nav_menu_btn`.
- **Font Awesome 6.4.0 Only**: Use Font Awesome classes (`<i class="fa-solid ..."></i>`, `<i class="fa-regular ..."></i>`, `<i class="fa-brands ..."></i>`) for all icons. Never use inline `<svg>` tags.
- **Zero Backend / Payment Gateways**: Keep the flow strictly client-side Pre-Order COD persisted in `localStorage` and redirecting directly to WhatsApp (`6282132829795`).
- **WhatsApp Direct Handoffs**:
  - **Pre-Order COD Checkout**: Finalized from `receipt.html` via itemized cart payload dispatched to `https://wa.me/6282132829795`.
  - **Customer Inquiry Handoff**: Intercepted from `#contact_form` across `index.html`, `product.html`, `product_2.html`, and `product_3.html`. Formats bilingual (`ENG` / `IDN` via `get_saved_lang()`) message payloads with sender Name (`sender_name`), Email (`sender_email`), and Message (`sender_message`), focuses the first empty control if validation fails, dispatches to `https://wa.me/6282132829795` in a new tab (`_blank`) with `window.location.href` fallback, and resets the form immediately.

---

## 3. Step-by-Step Execution Workflow
Follow this exact workflow for every task:

1. **Context Initialization**: Read `PRD.md` and `Design_System.md` completely.
2. **Codebase Audit**: Inspect the target HTML, CSS, and JS files alongside `architecture.md` and `variables.md`.
3. **Implementation**: Execute the requested code changes cleanly, adhering to all `Design_System.md` visuals, 1-to-1 script boundaries, i18n invariants, and `snake_case` rules.
4. **Mandatory Post-Task Documentation Updates**:
   - **Update `variables.md`**: Register every newly added, renamed, or modified HTML `class`, HTML `id`, and JS variable/function in its respective table.
   - **Update `changelog.md`**: Append a clear, structured summary of all file modifications, UI additions, and logic updates made during the session.
   - **Update `architecture.md` & `PRD.md`**: Keep the DOM tree diagram, decoupled script documentation, and requirement specs synchronized with the latest implementation.
