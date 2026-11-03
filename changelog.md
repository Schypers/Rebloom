# Changelog - ReBloom Codebase

All notable changes, bug fixes, UI enhancements, and structural refactors for the ReBloom static application are documented here chronologically.

---

## [2026-11-04] - Product Gallery Farthest-Left Queue Rotation & Multi-Page Pack Navigation

### 1. Farthest-Left Queue Rotation Gallery Swapper (`assets/js/product.js`)
- **Queue Rotation Mechanism**:
  - Replaced simple in-place 1-to-1 image swap with **Farthest-Left Queue Rotation**:
  - Clicking any thumbnail at index `i` (`0`, `1`, or `2`) promotes that thumbnail's photo to the main preview stage (`#prod_main_img`).
  - The previous main stage preview is inserted into the farthest-left slot (index `0`), shifting unclicked thumbnails to the right.
  - Implemented smooth `150ms` opacity transition (`opacity: 0.3` to `1.0`) during image promotion and queue rearrangement.
- **Master Pack Catalog Expansion (`pack_catalog`)**:
  - Standardized dedicated 4-photo gallery sets for all three packs:
    - **Pack 1 (`regular`)**: `Product_1.jpg` (Main), `Product_1_Desk.jpg` (Desk), `Product_1_Makro.jpg` (Macro), `Product_1_Black.jpg` (Black Background).
    - **Pack 2 (`bird_gift`)**: `Product_2.jpg` (Main), `Product_2_Desk.jpg` (Desk), `Product_2_Makro.jpg` (Macro), `Product_2_Black.jpg` (Black Background).
    - **Pack 3 (`lamp_pot`)**: `Product_3.jpg` (Main), `Product_3_Desk.jpg` (Desk), `Product_3_Makro.jpg` (Macro), `Product_3_Black.jpg` (Black Background).
  - Explicit `page_url` properties pointing to dedicated pages (`product.html`, `product_2.html`, `product_3.html`).

### 2. Multi-Page Pack Navigation (`index.html`, `product.html`, `product_2.html`, `product_3.html`, `assets/js/product.js`)
- **Real Page Navigation**:
  - Refactored `switch_active_pack(new_pack_key)` to execute `window.location.href = target_pack.page_url` instead of mutating URL via `history.pushState`.
  - Updated related product cards (`.rel_card > .rel_btn`) across all pages to perform full page navigation to the target product.
- **Dedicated Product Pages**:
  - Standardized `product.html` for Pack 1 (`Flower Pot Regular`).
  - Created `product_2.html` (and synced `product2.html`) for Pack 2 (`Flower Bird Gift`), featuring initial 4-photo set, `#prod_title`, `#prod_desc`, `#price_val`, and 4 color swatches.
  - Created `product_3.html` (and synced `product3.html`) for Pack 3 (`Lamp Flower Pot`), featuring initial 4-photo set, `#prod_title`, `#prod_desc`, `#price_val`, and 4 color swatches.
- **Landing Page CTA Links (`index.html`)**:
  - Updated the three catalog cards to link directly to their dedicated pages:
    - Card 1: `href="product.html"`
    - Card 2: `href="product_2.html"`
    - Card 3: `href="product_3.html"`

### 3. Documentation Updates
- Synchronized `PRD.md`, `architecture.md`, `AGENT.md`, and `changelog.md` with the farthest-left rotation algorithm and multi-page routing conventions.

---

## [2026-11-04] - Shopping Cart & Order Receipt Dual-State Refactoring

### 1. Dual-State Shopping Cart Architecture (`receipt.html`, `assets/css/receipt.css`, `assets/js/receipt.js`)
- **Empty Cart State (`#empty_cart_state`)**:
  - Activated whenever `cart.length === 0`.
  - Added centered white card (`.empty_cart_card`, max-width `480px`, `border-radius: 20px`, `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04)`).
  - Added soft pink circular cart icon disc (`.empty_icon_circle`, `64px x 64px`, `#fdecef`, `#e03e52`).
  - Added bold heading `"Your Cart is Empty"`, descriptive text, pill-shaped `"Start Shopping"` CTA button, and green COD trust badge (`.empty_trust_note`).
- **Populated Cart State (`#populated_cart_state`)**:
  - Activated whenever `cart.length > 0`.
  - Implemented responsive split layout (`.cart_split_layout` with `grid-template-columns: 1.35fr 1fr; gap: 32px;` on desktop; single-column below `900px`).
  - **Left Column (`.cart_items_column`)**:
    - Built dynamic `.cart_item_card` elements featuring:
      - 110px x 110px product thumbnail (`.item_thumb`, `12px` border radius).
      - Category badge (`.item_tag_pill` in `#fdecef` / `#e03e52`).
      - Pack title (`.item_title` in `18px`, `font-weight: 700`).
      - Selected color pill (`.color_pill` with circular `.color_dot`).
      - Customer request note pill (`.note_pill`) with inline edit trigger (`.note_edit_btn`).
      - Live inline note edit form (`.note_edit_form`) allowing immediate note editing with checkmark save and xmark cancel actions.
      - Top-right delete button (`.item_delete_btn` with `fa-trash-can`).
      - Bottom row with unit price block (`.unit_price_val`, e.g., `Rp 15.000`) and pill-shaped quantity stepper (`.qty_stepper` with `.qty_btn_minus` in `#fdecef` and `.qty_btn_plus` in `#eafaf1`).
    - Added outline pill `"Continue Shopping"` button (`.continue_shopping_btn`) linking to `product.html`.
  - **Right Column (`.order_summary_card`)**:
    - Added sticky Order Summary card with `position: sticky; top: 100px;`, `border-radius: 20px`, and `padding: 32px`.
    - Payment Method: `"Cash Only (Pre-Order COD)"`.
    - Delivery Mode: `"Direct Handover / WhatsApp Scheduled"`.
    - Real-time Order Date (`#summary_order_date`).
    - Subtotal row dynamically reflecting item count and calculated subtotal (`Rp XX.000,00`).
    - Packaging & Recycling Fee with green `FREE` pill badge.
    - Shipping Fee with green `FREE (COD PICKUP)` pill badge.
    - Grand Total row (`#summary_grand_total`).
    - Green COD guarantee banner (`.cod_guarantee_box` in `#eafaf1` / `#c8f0d8` with bold `#15803d` text).
    - Full-width pill `"Proceed to Checkout"` button (`#proceed_checkout_btn` in `#e03e52`).
    - Footnote explaining direct WhatsApp admin confirmation (`.checkout_footnote`).
- **Cart Subheader Bar (`.cart_header_bar`)**:
  - Added eyebrow label `"ECO-FRIENDLY & HANDMADE"` (`#e03e52`).
  - Added main heading `"Your Cart"` (`#1a1a1a`, `32px`, `800`).
  - Added dynamic review count highlight (`#cart_count_highlight` in bold `#e03e52`).

### 2. Monolithic Controller Decoupling into 1-to-1 Page Scripts
- **Strict 1-to-1 Mapping**:
  - `index.html` loads ONLY `assets/js/script.js`.
  - `product.html` (and variants `product2.html`, `product3.html`) loads ONLY `assets/js/product.js`.
  - `receipt.html` loads ONLY `assets/js/receipt.js`.
- **Pruned `assets/js/script.js`**:
  - Retains strictly Landing Page features: Navbar scroll spy, Language toggle, FAQ accordion, and Contact form.
  - Removed `pack_catalog`, formatting helpers, Product Gallery swapper, configurator routing, and legacy receipt `.rcpt_card` hydration.
- **Consolidated `assets/js/product.js`**:
  - Encapsulated within `DOMContentLoaded`.
  - Migrated `pack_catalog`, `format_idr`, `format_order_timestamp`, gallery swapper, URL parameter routing, related products, swatch handlers, quantity stepper, and Buy button with `localStorage` `rebloom_cart` persistence.
- **Dedicated `assets/js/receipt.js`**:
  - Verified sole responsibility for two-state cart hydration, item mutations, inline note editing, and WhatsApp Pre-Order checkout.

### 3. State Persistence & Checkout Logic (`assets/js/receipt.js`, `assets/js/product.js`)
- **`localStorage` Cart Management**:
  - Implemented master cart state under key `"rebloom_cart"`.
  - Added automatic migration from legacy single-item `sessionStorage` (`rebloom_order`) if arriving from previous order flows.
  - Connected `product.html` `"BUY NOW"` action to append or update items in `localStorage.getItem("rebloom_cart")`.
- **Live Calculations & Formatting**:
  - Unit price formatted as integer Rupiah (e.g., `Rp 15.000`).
  - Subtotals and Grand Totals formatted with Indonesian comma cents (e.g., `Rp 25.000,00`).
- **Interactive WhatsApp Pre-Order COD Checkout**:
  - Compiles itemized pre-order summary with all products, quantities, flower colors, customer notes, and grand total.
  - Copies plain-text receipt to clipboard with visual user feedback and opens `https://wa.me/6282132829795` with pre-filled message.

### 3. Strict Architectural Invariants & Styling (`assets/css/receipt.css`)
- Enforced zero `:root` blocks and zero `var(--...)` custom properties across the entire receipt stylesheet.
- Enforced hardcoded design values (`#e03e52`, `#c83244`, `#fdecef`, `#f6f6f6`, `#ffffff`, `#eeeeee`, `#1a1a1a`, `#757575`, `#1bb55c`, `#eafaf1`, `#c8f0d8`, `#15803d`).
- Enforced 100% `snake_case` naming on all newly introduced HTML classes, IDs, and JS identifiers.
- Used Font Awesome 6.4.0 exclusively for icons (no inline `<svg>` elements).

### 4. Documentation Suite Synchronization
- Updated `PRD.md`, `Design_System.md`, `architecture.md`, `AGENT.md`, `variables.md`, and `changelog.md`.

---

## [2026-10-26] - End-to-End E-Commerce Flow, Pack Configurator & Receipt Handoff

### 1. Catalog Architecture & URL Routing (`index.html`, `product.html`, `script.js`)
- **Three-Pack Catalog Contract**: Defined unified master catalog `pack_catalog` in `assets/js/script.js` with keys `regular` (`Rp 10.000`), `bird_gift` (`Rp 12.000`), and `lamp_pot` (`Rp 15.000`), complete with titles, descriptions, unit prices, and assets.
- **Landing Page Catalog Links**: Updated the three `.prod_btn` CTA anchors in `index.html` to target parameterized routes:
  - Card 1: `href="product.html?pack=regular"`
  - Card 2: `href="product.html?pack=bird_gift"`
  - Card 3: `href="product.html?pack=lamp_pot"`
- **FAQ Payment Method Update**: Updated first FAQ answer in `index.html#faq` to state clearly that ReBloom operates exclusively through **Pre-Order and Cash on Delivery (COD) / Cash Only**, with orders confirmed via WhatsApp.
- **URL Parameter Handling**: Implemented query parameter parser `new URLSearchParams(window.location.search).get("pack")` on `product.html` load with automatic fallback to `regular`. Added `popstate` event support for browser Back/Forward navigation.

### 2. Product Detail Configurator & Dynamic Interactions (`product.html`, `product.css`, `script.js`)
- **DOM Hooks**: Connected `#prod_title` on `.prod_title`, `#prod_desc` on `.prod_desc`, and `#price_val` on `.price_val`.
- **Purple Swatch & Swatch Titles**:
  - Added Purple flower swatch `<button type="button" class="color_swatch swatch_purple" data-color="Purple" data-hex="#A855F7" aria-label="Purple" title="Purple"></button>`.
  - Added `.color_swatch.swatch_purple { background-color: #A855F7; }` in `assets/css/product.css`.
  - Added `title="..."` attributes to all four swatches (Sky Blue, Purple, Orchid Pink, Pastel Pink) for enhanced accessibility.
- **Quantity Stepper & Live Pricing**:
  - Bound `.qty_minus` and `.qty_plus` to update `.qty_val` with minimum bound 1.
  - Dynamically recalculates and formats `unit_price * quantity` into `#price_val` using Indonesian locale separators (`id-ID`).
- **Dynamic Related Products Switching**:
  - Populates `.rel_left` dynamically with the two inactive packs.
  - Bound `.rel_btn` (`Switch / Order Pack`) on related cards to switch the active pack, update URL parameter via `window.history.pushState`, refresh product details/price, and smoothly scroll to `#product_detail`.
- **Sanitized Request Note**: Reads `#custom_note.value.trim()`.
- **Dead Comments Cleanup**: Purged legacy commented-out lines and unneeded prototypes from `product.html`.

### 3. Dynamic Order Receipt & Screenshot-Free WhatsApp Handoff (`receipt.html`, `receipt.css`, `script.js`)
- **Script Connection**: Linked `<script src="assets/js/script.js"></script>` immediately before `</body>` in `receipt.html`.
- **Screenshot Instruction Replacement**: Replaced `.status_desc` text with:
  `Thank you for your purchase! No screenshot needed—just click 'Send To Admin' to automatically copy your ready-to-paste order receipt and send it via WhatsApp.`
- **Dynamic Receipt Hydration**:
  - Deserializes `sessionStorage.getItem("rebloom_order")` on load.
  - Sets Order Date & Time to real timestamp formatted as `dd MMM yyyy, hh:mm AM/PM`.
  - Sets Payment Method to `Cash Only (Pre-Order COD)`.
  - Sets Line Item to `<quantity>x <pack_name>` (e.g. `2x Flower Bird Gift`).
  - Dynamically sets `.custom_dot` background color to `color_hex`.
  - Renders `.custom_text` as `<Color Name>, “<Custom Note>”` or `<Color Name> (No custom note)` (eliminating legacy dummy notes).
  - Sets item subtotal and grand total to calculated total in Indonesian Rupiah format (`Rp XX.000,00`).
- **One-Click Clipboard Copy & WhatsApp Handoff**:
  - Bound `#btn_admin` to copy the complete plain-text formatted order receipt (`wa_message`) to clipboard via `navigator.clipboard.writeText(wa_message)`.
  - Encodes receipt text and opens `https://wa.me/6282132829795?text=...`.
  - Displays user action feedback ("Receipt Copied! Opening WhatsApp...") and falls back gracefully if clipboard permissions are restricted.
- **Obsolete Commented Code Purge**:
  - Removed obsolete commented-out `<header class="nav_bar">` from `receipt.html`.
  - Removed dead commented `.nav_bar` CSS rules from `assets/css/receipt.css`.
  - Corrected responsive media queries in `receipt.css` to target `.navbar` and `.nav_mid`.

### 4. Documentation Suite Synchronization
- **`PRD.md`**: Synchronized three-pack catalog routing, Purple swatch, `rebloom_order` contract, and screenshot-free WhatsApp handoff.
- **`architecture.md`**: Updated DOM hierarchy trees, layout specifications, and Section 5 client runtime architecture.
- **`Design_System.md`**: Updated color system table with Purple swatch (`#A855F7`), catalog pricing, and receipt handoff rules.
- **`variables.md`**: Registered all new and updated classes, IDs, catalog keys, and runtime functions.

---

## [2026-10-19] - Regular Pack Product Configurator Overhaul

### 1. Product Showcase HTML Overhaul (`product.html`)
- Configurator restructure to match Regular Pack mockup.
- Rating update to 5.0 | 12 Reviews.
- Circular color swatches and quantity stepper.
- Custom note input and buy button styling.

### 2. Styling & CSS Invariants (`assets/css/product.css`)
- Zero `:root` verification.
- Customization row flex layout and pill button styling.

### 3. JavaScript Interactive Controls & State Contract (`assets/js/script.js`)
- Color swatch selection and quantity stepper listeners.
- Order serialization prototype.

---

## [Initial Release] - ReBloom Order Receipt Refactor
- Migrated legacy `kebab-case` classes and IDs in `receipt.html` and `receipt.css` to strict `snake_case`.
- Replaced inline SVGs with Font Awesome 6.4.0 icons.
- Enforced hardcoded hex color declarations with zero `:root` variables.
