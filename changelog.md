# Changelog - ReBloom Codebase

All notable changes, bug fixes, UI enhancements, and structural refactors for the ReBloom static application are documented here chronologically.

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
