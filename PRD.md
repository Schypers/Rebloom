# Product Requirements Document (PRD) — ReBloom Web Application

## 1. Executive Summary & Product Vision
- **Product Name**: ReBloom
- **Brand Tagline**: *"Decor At Finest — Turning Waste Into Something Beautiful"*
- **Product Vision**: ReBloom is a direct-to-consumer (D2C) promotional storefront and pre-order web application for handcrafted floral decor crafted from 100% recycled plastic waste. The platform showcases sustainable craftsmanship, empowers customers to configure floral arrangements (pack tiers, petal colors, quantities, and custom crafting notes), maintains a robust persistent shopping cart, and finalizes pre-orders via direct WhatsApp handoff.
- **Commerce & Fulfillment Model**: 
  - **100% Pre-Order & Cash on Delivery (COD) / Cash Only**: Every piece is handcrafted to order (2–4 business days crafting time).
  - **Zero Online Payment Gateways**: No payment gateway processing, third-party checkouts, or credit card forms are used.
  - **Zero Backend / Zero Authentication**: Pure static frontend architecture. Customers browse, customize, manage cart items in `localStorage`, and checkout seamlessly via WhatsApp.

---

## 2. Target Audience & User Flow
### 2.1 Target Audience
- Eco-conscious buyers and gift shoppers looking for affordable (`Rp 10.000` – `Rp 15.000`), customizable, aesthetic handmade floral decor.
- Mobile and desktop users who prioritize fast, frictionless pre-orders directly confirmed with the artisan admin via WhatsApp.

### 2.2 End-to-End User Journey
```
[1. Discovery: index.html]
   Customer browses brand story, value pillars, FAQ, and 3 Product Packs
   └── Clicks ".prod_btn" ("Order Product")
         │ (Routes to product.html?pack=regular, ?pack=bird_gift, or ?pack=lamp_pot)
         ▼
[2. Customization: product.html]
   Customer views gallery, selects Pack tier, chooses Flower Color (4 swatches),
   adjusts Quantity, enters optional Custom Note, and sees live calculated price
   └── Clicks ".prod_buy_btn" ("BUY NOW")
         │ (Appends/updates cart item in localStorage 'rebloom_cart' & redirects)
         ▼
[3. Shopping Cart & Receipt: receipt.html]
   Two-State UI:
   ├── A. Empty State (cart.length === 0):
   │      Displays centered card with soft pink cart icon, description,
   │      "Start Shopping" CTA button, and green COD trust badge.
   └── B. Populated State (cart.length > 0):
          Two-column split view (1.35fr : 1fr):
          ├── Left: Cart items list (thumbnail, category badge, title, color pill,
          │         editable note with pen icon, unit price, +/- stepper, delete trash button)
          │         + "Continue Shopping" button
          └── Right: Sticky Order Summary (Payment Method, Delivery Mode, Order Date,
                    subtotal, FREE packaging & shipping badges, grand total,
                    green COD guarantee box, Proceed to Checkout button, and footnote)
   └── Clicks "#proceed_checkout_btn" ("Proceed to Checkout")
         ├── Automatically copies complete itemized receipt to clipboard
         └── Opens WhatsApp (6282132829795) with pre-filled order ready to send
```

---

## 3. Page-by-Page Functional Specifications

### 3.1 Landing & Brand Showcase Page (`index.html`, `assets/css/style.css`)
- **Purpose**: Introduce the ReBloom brand, educate visitors on plastic waste upcycling, showcase product tiers, answer common questions, and funnel users to the product configurator.
- **Key Sections & Components**:
  1. **Fixed Navigation Header (`.navbar`)**:
     - Brand identity (`.nav_left > a > .logo_img, .logo_txt`).
     - Center anchor navigation (`.nav_mid > .nav_link` targeting `#home`, `#about`, `#products`, `#faq`, `#contact`).
     - Right language toggle capsule (`.nav_right > .lang_switch > .lang_btn` for `IDN` / `ENG`).
  2. **Hero Section (`.hero_sec#home`)**:
     - Dual-layer overlapping display typography (`.hero_solid` and `.hero_outline`) reading *"Decor At Finest"*.
     - Centerpiece handcrafted tulip visual (`assets/images/Tulip_hero.png`) with ambient crimson radial glow.
     - Primary CTA (`.hero_cta_btn` scrolling to `#products`).
  3. **Value Pillars Bar (`.feat_wrap`)**:
     - Four core highlights: *Environmentally friendly*, *Hand Made*, *Affordable prices*, and *Suitable as a gift*.
  4. **Vision & Mission Section (`.vm_sec#vision`)**:
     - Artisan workshop photography paired with brand vision and a 4-point mission list.
  5. **Origin Story Section (`.about_sec#about`)**:
     - Narrative detailing ReBloom's founding origin paired with artisan photography.
  6. **Why Choose Us Grid (`.why_sec`)**:
     - 2x2 grid (`.why_grid` > `.why_item`) with numbered crimson badges (`01.` to `04.`).
  7. **Product Catalog Grid (`.prod_sec#products`)**:
     - 3-column catalog grid:
       - **Card 1 (`regular`)**: `Flower Pot Regular` (`Rp 10.000 / pcs`) -> `product.html?pack=regular`
       - **Card 2 (`bird_gift`)**: `Flower Bird Gift` (`Rp 12.000 / pcs`) -> `product.html?pack=bird_gift`
       - **Card 3 (`lamp_pot`)**: `Lamp Flower Pot` (`Rp 15.000 / pcs`) -> `product.html?pack=lamp_pot`
  8. **FAQ Accordion (`.faq_sec#faq`)**:
     - Explains that ReBloom operates exclusively through **Pre-Order and Cash on Delivery (COD) / Cash Only**.
  9. **Contact Section (`.contact_sec#contact`) & Footer (`.footer`)**:
     - WhatsApp direct link and inquiry form.

---

### 3.2 Product Customization & Configurator Pages (`product.html`, `product_2.html`, `product_3.html`, `assets/css/product.css`, `assets/js/product.js`)
- **Purpose**: Allow customers to inspect product imagery across standardized 4-photo galleries, customize pack options, pick flower colors, set quantity with live price calculation, write an optional request note, and add items to cart.
- **Multi-Page Routing**:
  - **Pack 1 (`regular`)**: Flower Pot Regular (Rp 10.000) at `product.html`.
  - **Pack 2 (`bird_gift`)**: Flower Bird Gift (Rp 12.000) at `product_2.html` (synced to `product2.html`).
  - **Pack 3 (`lamp_pot`)**: Lamp Flower Pot (Rp 15.000) at `product_3.html` (synced to `product3.html`).
  - Switching packs via `.rel_btn` executes full page navigation (`window.location.href = target_pack.page_url`).
- **Standardized 4-Photo Gallery Asset Sets**:
  - Each product features four dedicated photos:
    1. Main Preview: `Product_{N}.jpg`
    2. Thumbnail 1 (Desk View): `Product_{N}_Desk.jpg`
    3. Thumbnail 2 (Macro View): `Product_{N}_Makro.jpg`
    4. Thumbnail 3 (Black Background View): `Product_{N}_Black.jpg`
- **Key Sections & Components**:
  1. **Interactive Product Gallery with Farthest-Left Queue Rotation (`.prod_left`)**:
     - Primary stage preview (`#prod_main_img`) with smooth 150ms opacity transition.
     - 3 clickable thumbnails (`.prod_thumb` with `.prod_thumb_img`).
     - **Farthest-Left Queue Rotation Algorithm**: Clicking thumbnail at index `i` promotes its image to `#prod_main_img`. The former main preview is shifted into the farthest-left slot (`thumb_imgs[0]`), pushing intermediate thumbnails `[0 ... i-1]` to the right.
  2. **Product Information & Customization Panel (`.prod_right`)**:
     - Pack title (`#prod_title`) and description (`#prod_desc`) from catalog.
     - Rating display (`5.0 | 12 Reviews`) paired with 5 gold stars.
     - **Interactive Customization Controls (`.custom_row`)**:
       - **Flower Color Selector (`.color_sec`)**: Four circular swatch buttons:
         - **Sky Blue**: `data-color="Sky Blue"`, `data-hex="#0084FF"` (default)
         - **Purple**: `data-color="Purple"`, `data-hex="#A855F7"`
         - **Orchid Pink**: `data-color="Orchid Pink"`, `data-hex="#E199D2"`
         - **Pastel Pink**: `data-color="Pastel Pink"`, `data-hex="#F5B0C4"`
       - **Quantity Stepper (`.qty_sec`)**: Stepper pill (`-` / `qty_val` / `+`, minimum 1).
     - **Custom Request Note Input (`.note_sec`)**:
       - Text input (`#custom_note.note_inp`).
     - **Live Dynamic Price Display (`.prod_price_box`)**:
       - Dynamic price formatted with Indonesian thousands separators (`#price_val`).
     - **Security Trust Badge (`.prod_sec_pay`)**:
       - Green shield icon (`#1bb55c`) with `"Secure Payment By ReBloom"`.
     - **Primary Buy CTA (`.prod_buy_btn` — `"BUY NOW"`)**:
       - Saves/appends item to `localStorage` under `rebloom_cart`.
       - Redirects customer to `receipt.html`.
  3. **Related Products Showcase (`.rel_sec#related_products`)**:
     - Renders alternative catalog packs with `.rel_btn` triggering full page navigation (`switch_active_pack`) to the target product page.

---

### 3.3 Shopping Cart & Order Receipt Page (`receipt.html`, `assets/css/receipt.css`, `assets/js/receipt.js`)
- **Purpose**: Provide a dual-state shopping cart experience with item management (quantity stepper, item removal, editable notes), live price recalculations, and WhatsApp Pre-Order COD checkout.
- **Key Sections & Components**:
  1. **Cart Header Bar (`.cart_header_bar`)**:
     - Eyebrow: `ECO-FRIENDLY & HANDMADE` (`#e03e52`).
     - Main heading: `Your Cart` (`#1a1a1a`, 32px, 800).
     - Reviewing count: `Reviewing <span id="cart_count_highlight">X items</span> selected for checkout`.
  2. **Empty Cart State (`#empty_cart_state`)**:
     - Displayed when `cart.length === 0`.
     - Centered card (`.empty_cart_card`, max-width 480px, border-radius 20px, padding 56px 40px).
     - Soft pink icon disc (`.empty_icon_circle`, 64px x 64px, `#fdecef`, `#e03e52`, `fa-cart-shopping`).
     - Bold title: `Your Cart is Empty`.
     - Description: `Looks like you haven't added any handcrafted floral pieces to your cart yet. Explore our sustainable collection to find your favorite.`
     - CTA button (`.start_shopping_btn`): `Start Shopping <i class="fa-solid fa-arrow-right"></i>` linking to `product.html`.
     - Trust note (`.empty_trust_note`): `<i class="fa-solid fa-shield-halved"></i> Secure Pre-Order COD & WhatsApp Confirmation Available`.
  3. **Populated Cart State (`#populated_cart_state`)**:
     - Displayed when `cart.length > 0`.
     - Split layout (`.cart_split_layout`): `grid-template-columns: 1.35fr 1fr; gap: 32px;` (collapses to single column on screens `<= 900px`).
     - **Left Column: Cart Items (`.cart_items_column`)**:
       - `#cart_items_list` containing dynamic `.cart_item_card` cards:
         - Thumbnail (`.item_thumb`, 110px x 110px, border-radius 12px, object-fit cover).
         - Category badge (`.item_tag_pill`, e.g., `Recycled Plastic` or `Handcrafted`).
         - Product title (`.item_title`).
         - Color pill (`.color_pill` with `.color_dot` and color name).
         - Note pill (`.note_pill`) with inline edit button (`.note_edit_btn` with `fa-pen-to-square`) and live inline editing form (`.note_edit_form`).
         - Top-right delete button (`.item_delete_btn` with `fa-trash-can`).
         - Bottom row with `Unit Price` (`.unit_price_val`, e.g. `Rp 15.000`) and quantity stepper (`.qty_stepper`: `.qty_btn_minus`, `.qty_value`, `.qty_btn_plus`).
       - Continue shopping button (`.continue_shopping_btn`): `<i class="fa-solid fa-arrow-left"></i> Continue Shopping`.
     - **Right Column: Order Summary (`.order_summary_card`)**:
       - White card with sticky positioning on desktop (`top: 100px;`).
       - Heading: `Order Summary` (20px, 800).
       - Payment method: `PAYMENT METHOD` -> `Cash Only (Pre-Order COD)`.
       - Delivery mode: `DELIVERY MODE` -> `Direct Handover / WhatsApp Scheduled`.
       - Order date: `ORDER DATE` -> Real-time formatted date string.
       - Dashed divider (`.summary_divider_dashed`).
       - Subtotal row: `Items Subtotal (<span id="summary_item_count">X</span> items)` -> `<span id="summary_subtotal_price">Rp XX.000,00</span>`.
       - Packaging fee: `Packaging & Recycling Fee` -> `<span class="free_badge">FREE</span>`.
       - Shipping fee: `Shipping Fee` -> `<span class="free_badge">FREE (COD PICKUP)</span>`.
       - Solid divider (`.summary_divider_solid`).
       - Grand total: `Total` -> `<span id="summary_grand_total">Rp XX.000,00</span>`.
       - COD guarantee banner (`.cod_guarantee_box`): `<i class="fa-solid fa-circle-check"></i> Secure Pre-Order COD By ReBloom`.
       - Primary checkout button (`#proceed_checkout_btn`): Full-width crimson pill `Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>`.
       - Checkout footnote (`.checkout_footnote`): `Orders are confirmed directly with our admin via WhatsApp upon checkout.`
  4. **Clean Footer (`.footer_bar`)**:
     - `© 2026 ReBloom. All Rights Reserved. Creative Handicrafts & Sustainable Decor.`

---

## 4. Technical Architecture & Coding Invariants

### 4.1 Core Stack & File Topology
- **HTML5**: `index.html`, `product.html`, `receipt.html`
- **CSS3**: `assets/css/style.css`, `assets/css/product.css`, `assets/css/receipt.css`
- **JavaScript (ES6+)**: `assets/js/script.js`, `assets/js/receipt.js`
- **Documentation Suite**: `PRD.md`, `architecture.md`, `Design_System.md`, `variables.md`, `changelog.md`, `AGENT.md`

### 4.2 Strict Coding Invariants
1. **100% `snake_case` Identifiers**:
   - Every HTML `class`, HTML `id`, data attribute (`data-*`), JS variable, JS function, and storage key strictly follows `snake_case`. Standard Font Awesome classes retain their official syntax.
2. **Zero CSS Custom Properties (`:root` Forbidden)**:
   - All CSS properties in `receipt.css` use hardcoded hex values and explicit dimensions directly on selector rules.
3. **Font Awesome 6.4.0 Only**:
   - All iconography uses Font Awesome 6.4.0 classes (`<i class="fa-solid ..."></i>`, `<i class="fa-regular ..."></i>`, `<i class="fa-brands ..."></i>`). Inline `<svg>` tags are strictly forbidden.
4. **Clean Code & Zero Dead Comments**:
   - All unused markup and dead CSS rules are completely removed.

---

## 5. Client-Side Data Contract (`localStorage`)

Cart items are persisted in `localStorage` under the key `rebloom_cart` as an array of JSON objects:

```json
[
  {
    "id": "item_1730680000_123",
    "pack_key": "lamp_pot",
    "pack_name": "Lamp Flower Pot",
    "category": "Recycled Plastic",
    "image": "assets/images/Product_img_4.jpg",
    "unit_price": 15000,
    "quantity": 1,
    "selected_color": "Sky Blue",
    "flower_color": "Sky Blue",
    "color_hex": "#0084FF",
    "custom_note": "Leave on porch",
    "item_price": "Rp 15.000",
    "total_price": "Rp 15.000,00",
    "total_price_num": 15000,
    "order_date": "04 Nov 2026, 01:30 AM",
    "payment_method": "Cash Only (Pre-Order COD)"
  }
]
```

### WhatsApp Message Payload Format (`#proceed_checkout_btn`)
When `#proceed_checkout_btn` is clicked on `receipt.html`, the following plain-text message is copied to the clipboard and encoded into `https://wa.me/6282132829795?text=...`:

```text
Hello ReBloom Admin! I would like to place a Pre-Order (Cash on Delivery):

*Order Date:* 04 Nov 2026, 01:30 AM
*Payment Method:* Cash Only (Pre-Order COD)
*Delivery Mode:* Direct Handover / WhatsApp Scheduled

*Order Items:*
1. *Lamp Flower Pot* (x1)
   • Flower Color: Sky Blue
   • Custom Note: Leave on porch
   • Price: Rp 15.000 × 1 = Rp 15.000

2. *Flower Pot Regular* (x1)
   • Flower Color: Pastel Pink
   • Custom Note: None
   • Price: Rp 10.000 × 1 = Rp 10.000

*Packaging & Recycling:* FREE
*Shipping Fee:* FREE (COD PICKUP)
*Grand Total:* Rp 25.000,00

Please confirm my pre-order details. Thank you!
```

---

## 6. Acceptance Criteria Checklist
- [x] Empty Cart State correctly displays `#empty_cart_state` when `cart.length === 0`.
- [x] Populated Cart State correctly displays `#populated_cart_state` when `cart.length > 0`.
- [x] Shared navigation header and footer render cleanly with brand identity.
- [x] Cart item cards render thumbnail, title, category badge, color dot & name, editable note, unit price, quantity stepper, and delete button.
- [x] Plus button increments quantity; minus button decrements quantity (removing item if quantity reaches 0).
- [x] Trash button removes item from cart immediately.
- [x] Inline note editing allows customer to update special request notes directly in `localStorage`.
- [x] Subtotals and grand totals update dynamically upon any cart mutation.
- [x] Unit prices formatted as `Rp XX.000` and summary totals formatted as `Rp XX.000,00`.
- [x] Sticky Order Summary includes Payment Method, Delivery Mode, Order Date, FREE fee badges, and green COD guarantee banner.
- [x] WhatsApp checkout button itemizes complete cart details and opens `https://wa.me/6282132829795` with pre-filled message.
- [x] Responsive layout collapses to single-column layout on screens below 900px.
- [x] No `:root` declarations or `var(--...)` custom properties in `receipt.css`.
- [x] All HTML and JS identifiers strictly follow `snake_case`.
