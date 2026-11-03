# Product Requirements Document (PRD) — ReBloom Web Application

## 1. Executive Summary & Product Vision
- **Product Name**: ReBloom
- **Brand Tagline**: *"Decor At Finest — Turning Waste Into Something Beautiful"*
- **Product Vision**: ReBloom is a direct-to-consumer (D2C) promotional and pre-order web application for handmade floral bouquets and vases crafted from 100% post-consumer recycled plastic bottles. The platform showcases sustainable craftsmanship, allows customers to personalize their floral arrangements (flower colors, pack tier selection, quantity, and custom crafting notes), and streamlines order fulfillment through an automated receipt-to-WhatsApp handoff.
- **Commerce & Fulfillment Model**: 
  - **100% Pre-Order & Cash on Delivery (COD) / Cash Only**: Every item is handcrafted to order (2–4 business days crafting time).
  - **Zero Online Payment Gateways**: No credit cards, e-wallets, bank transfer APIs, or third-party checkout processors are used.
  - **Zero Backend / Zero Authentication**: Pure client-side static architecture. Customers browse, configure, and finalize pre-orders seamlessly via client storage and direct WhatsApp handoff.

---

## 2. Target Audience & User Flow
### 2.1 Target Audience
- Eco-conscious buyers and gift shoppers looking for affordable (`Rp 10.000` – `Rp 15.000`), customizable, aesthetic handmade floral decor.
- Mobile and desktop users who prefer instant, frictionless ordering via WhatsApp without complicated multi-step checkouts.

### 2.2 End-to-End 3-Page User Journey
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
         │ (Saves rebloom_order payload to sessionStorage & redirects)
         ▼
[3. Confirmation & Handoff: receipt.html]
   Customer reviews dynamically hydrated Order Receipt ("Cash Only (Pre-Order COD)")
   └── Clicks "#btn_admin" ("Send To Admin")
         ├── 1. Automatically copies formatted plain-text receipt to clipboard
         └── 2. Opens WhatsApp (6282132829795) with pre-filled receipt ready to send (No screenshot needed)
```

---

## 3. Page-by-Page Functional Specifications

### 3.1 Landing & Brand Showcase Page (`index.html`, `assets/css/style.css`)
- **Purpose**: Introduce the ReBloom brand, educate visitors on plastic waste upcycling, showcase product tiers, answer common questions, and funnel users to the product configurator.
- **Key Sections & Components**:
  1. **Fixed Navigation Header (`.navbar`)**:
     - Left brand identity (`.nav_left` > `.logo_img`, `.logo_txt`).
     - Center anchor navigation (`.nav_mid` > `.nav_link` targeting `#home`, `#about`, `#products`, `#faq`, `#contact`) with active scroll-spy highlighting.
     - Right language toggle capsule (`.nav_right` > `.lang_switch` > `.lang_btn` for `IDN` / `ENG`).
  2. **Hero Section (`.hero_sec#home`)**:
     - Dual-layer overlapping display typography (`.hero_solid` and `.hero_outline`) reading *"Decor At Finest"*.
     - Centerpiece handcrafted tulip visual (`assets/images/Tulip_hero.png`) with ambient crimson radial blur.
     - Left value proposition copy (`.hero_left`) and right primary CTA (`.hero_cta_btn` scrolling to `#products`).
  3. **Value Pillars Bar (`.feat_wrap`)**:
     - Four core highlights: *Environmentally friendly*, *Hand Made*, *Affordable prices*, and *Suitable as a gift*.
  4. **Vision & Mission Section (`.vm_sec#vision`)**:
     - Staggered artisan photography (`.vm_img_1`, `.vm_img_2`) paired with brand vision and a 4-point mission list (`.vm_list`).
  5. **Origin Story Section (`.about_sec#about`)**:
     - Narrative copy detailing ReBloom's founding origin paired with team photography (`.about_img_1`, `.about_img_2`).
  6. **Why Choose Us Grid (`.why_sec`)**:
     - 2x2 grid (`.why_grid` > `.why_item`) with numbered crimson badges (`01.` to `04.`).
  7. **Product Catalog Grid (`.prod_sec#products`)**:
     - 3-column grid (`.prod_grid` > `.prod_card`) displaying the complete three-pack catalog:
       - **Card 1 (`regular`)**: `Flower Pot Regular` (`Rp 10.000,00 / pcs`) -> routes to `product.html?pack=regular`
       - **Card 2 (`bird_gift`)**: `Flower Bird Gift` (`Rp 12.000,00 / pcs`) -> routes to `product.html?pack=bird_gift`
       - **Card 3 (`lamp_pot`)**: `Lamp Flower Pot` (`Rp 15.000,00 / pcs`) -> routes to `product.html?pack=lamp_pot`
  8. **FAQ Accordion (`.faq_sec#faq`)**:
     - Interactive single-open accordion (`.faq_box` > `.faq_item`).
     - **Payment FAQ Rule**: Accurately explains that ReBloom operates exclusively through **Pre-Order and Cash on Delivery (COD) / Cash Only**, confirmed directly with the admin via WhatsApp upon checkout.
  9. **Contact Section (`.contact_sec#contact`) & Footer (`.footer`)**:
     - Direct WhatsApp link and client-side inquiry form (`#contact_form`).

---

### 3.2 Product Customization & Configurator Page (`product.html`, `assets/css/product.css`)
- **Purpose**: Allow customers to inspect product imagery, customize pack options, pick flower colors, set quantity with live price calculation, write an optional request note, and initiate checkout.
- **Key Sections & Components**:
  1. **Interactive Product Gallery (`.prod_left`)**:
     - Primary stage image (`#prod_main_img`) dynamically loaded to reflect the selected pack.
     - 3 clickable thumbnails (`.prod_thumb` > `.prod_thumb_img`) that smoothly swap preview source with the main image on click.
  2. **Product Information & Customization Panel (`.prod_right`)**:
     - Dynamic product title (`#prod_title` on `.prod_title`) and description (`#prod_desc` on `.prod_desc`) populated from `pack_catalog`.
     - Rating display (`.prod_rating` — `5.0 | 12 Reviews`) paired with 5 gold stars.
     - **Interactive Customization Controls (`.custom_row`)**:
       - **Flower Color Selector (`.color_sec`)**: Four circular swatch buttons (`.color_swatch`) with active dark selection ring:
         - **Sky Blue**: `data-color="Sky Blue"`, `data-hex="#0084FF"` (active default)
         - **Purple**: `data-color="Purple"`, `data-hex="#A855F7"`
         - **Orchid Pink**: `data-color="Orchid Pink"`, `data-hex="#E199D2"`
         - **Pastel Pink**: `data-color="Pastel Pink"`, `data-hex="#F5B0C4"`
       - **Quantity Stepper (`.qty_sec`)**: Pill capsule stepper (`.qty_box`) with decrement button (`.qty_minus`), quantity number (`.qty_val`, minimum 1), and increment button (`.qty_plus`).
     - **Custom Request Note Input (`.note_sec`)**:
       - Text input (`#custom_note.note_inp`) with placeholder `"Have a special request? Leave a note for our admin."`. Trimmed via `.value.trim()`.
     - **Live Dynamic Price Display (`.prod_price_box`)**:
       - Displays `"Rp"` (`.price_curr`) + quantity-calculated price formatted with Indonesian separators (`#price_val` on `.price_val`).
     - **Security Trust Badge (`.prod_sec_pay`)**:
       - Green shield icon (`#24CC63`) with `"Secure Payment By ReBloom"`.
     - **Primary Checkout Action (`.prod_buy_btn` — `"BUY NOW"`)**:
       - Serializes complete order data into `sessionStorage.setItem("rebloom_order", ...)`.
       - Redirects customer to `receipt.html`.
  3. **Related Products Showcase (`.rel_sec#related_products`)**:
     - Dynamically renders the two inactive packs in `.rel_left`.
     - Each card contains `.rel_btn` (`Switch / Order Pack`) which updates the active pack, updates the URL parameter (`?pack=...`), refreshes product details and price, updates related cards, and scrolls smoothly to `#product_detail`.

---

### 3.3 Order Receipt & WhatsApp Handoff Page (`receipt.html`, `assets/css/receipt.css`)
- **Purpose**: Present an official dynamic order receipt and provide a single-click action that copies a complete ready-to-send plain-text receipt to the clipboard and opens WhatsApp with the message pre-filled.
- **Key Sections & Components**:
  1. **Confirmation Status Column (`.rcpt_status`)**:
     - Double-ring green confirmation badge (`.status_badge` > `.badge_inner` > `.chk_icon`).
     - Headline (`.status_title`: *"Your Order Is Being Processed!"*).
     - Instruction copy (`.status_desc`): *"Thank you for your purchase! No screenshot needed—just click 'Send To Admin' to automatically copy your ready-to-paste order receipt and send it via WhatsApp."*
     - **Primary CTA (`#btn_admin` — `"Send To Admin"`)**:
       - Copies formatted plain-text order receipt to clipboard via `navigator.clipboard.writeText(wa_message)`.
       - Opens `https://wa.me/6282132829795?text=...` with the pre-filled message.
       - Provides user feedback ("Receipt Copied! Opening WhatsApp...").
     - **Secondary CTA (`#btn_back` — `"Back To Product"`)**:
       - Routes back to `product.html`.
  2. **Dynamic Receipt Card (`.rcpt_card`)**:
     - **Order Metadata (`.order_info`)**:
       - `Order Date & Time`: Hydrated from `order_date` in `dd MMM yyyy, hh:mm AM/PM` format (e.g., `26 Oct 2026, 02:00 AM`).
       - `Payment Method`: Dynamically set to `Cash Only (Pre-Order COD)`.
     - **Line Items Section (`.items_sec`)**:
       - `.item_name`: Displays `<quantity>x <pack_name>` (e.g., `2x Flower Bird Gift`).
       - `.custom_dot`: Dynamically colored to match selected `color_hex`.
       - `.custom_text`: Displays selected color name and user note (`<Color Name>, “<Custom Note>”` or `<Color Name> (No custom note)`).
       - `.item_price`: Displays calculated total in IDR format (`Rp 24.000,00`).
     - **Grand Total (`.total_group`)**:
       - `.total_val`: Displays calculated total amount (`Rp 24.000,00`).
  3. **Script Connection**:
     - Linked with `<script src="assets/js/script.js"></script>` before `</body>`.

---

## 4. Technical Architecture & Coding Invariants

### 4.1 Core Stack & File Topology
- **HTML5**: `index.html`, `product.html`, `receipt.html`
- **CSS3**: `assets/css/style.css`, `assets/css/product.css`, `assets/css/receipt.css`
- **JavaScript (ES6+)**: `assets/js/script.js`
- **Documentation Suite**: `PRD.md`, `architecture.md`, `Design_System.md`, `variables.md`, `changelog.md`

### 4.2 Strict Coding Invariants
1. **100% `snake_case` Identifiers**:
   - Every HTML `class`, HTML `id`, data attribute (`data-*`), JS variable, JS function, and storage key strictly follows `snake_case`.
2. **Zero CSS Custom Properties (`:root` Forbidden)**:
   - All CSS properties use hardcoded hex values and font stacks directly on individual rules.
3. **Font Awesome 6.4.0 Only**:
   - All iconography uses Font Awesome 6.4.0 classes (`<i class="fa-solid ..."></i>` or `<i class="fa-brands ..."></i>`). Inline `<svg>` tags are strictly prohibited.
4. **Clean Code & Zero Dead Comments**:
   - Obsolete commented-out HTML blocks and dead CSS selectors are completely removed.

---

## 5. Client-Side Data Contract (`sessionStorage`)

When a customer clicks **BUY NOW** (`.prod_buy_btn`) on `product.html`, `assets/js/script.js` serializes the following JSON structure into `sessionStorage.setItem('rebloom_order', JSON.stringify(rebloom_order))`:

```json
{
  "pack_key": "regular",
  "pack_name": "Flower Pot Regular",
  "unit_price": 10000,
  "quantity": 2,
  "selected_color": "Purple",
  "flower_color": "Purple",
  "color_hex": "#A855F7",
  "custom_note": "Make the ribbon extra long!",
  "item_price": "Rp 10.000,00",
  "total_price": "Rp 20.000,00",
  "total_price_num": 20000,
  "order_date": "26 Oct 2026, 02:00 AM",
  "payment_method": "Cash Only (Pre-Order COD)"
}
```

### WhatsApp Message Payload Format (`#btn_admin`)
When `#btn_admin` is clicked on `receipt.html`, the following plain-text message is copied to the clipboard and encoded into `https://wa.me/6282132829795?text=...`:

```text
Hello ReBloom Admin! Here is my Pre-Order Receipt:

*Order Date:* 26 Oct 2026, 02:00 AM
*Payment Method:* Cash Only (Pre-Order COD)
*Pack Name:* Flower Pot Regular
*Quantity:* 2
*Unit Price:* Rp 10.000,00
*Flower Color:* Purple
*Custom Note:* "Make the ribbon extra long!"
*Total Price:* Rp 20.000,00

Please confirm my order. Thank you!
```

---

## 6. Acceptance Criteria Checklist
- [x] `index.html` product card links route correctly via `?pack=regular`, `?pack=bird_gift`, and `?pack=lamp_pot`.
- [x] `index.html` FAQ accurately describes the **Pre-Order and Cash on Delivery (COD) / Cash Only** model.
- [x] `product.html` hooks `#prod_title`, `#prod_desc`, and `#price_val` bound to dynamic catalog data.
- [x] Four color swatches configured: Sky Blue (`#0084FF`), Purple (`#A855F7`), Orchid Pink (`#E199D2`), and Pastel Pink (`#F5B0C4`).
- [x] Quantity stepper updates displayed price live and enforces minimum limit 1.
- [x] Related products render alternative packs and switch active configuration with smooth scroll.
- [x] Clicking `.prod_buy_btn` stores real order data in `sessionStorage` and redirects to `receipt.html`.
- [x] `receipt.html` loads `assets/js/script.js` and dynamically renders order date, payment method, pack name, quantity, color dot, custom note, and total price.
- [x] Clicking `#btn_admin` copies formatted plain-text receipt to clipboard and opens WhatsApp without requiring screenshots.
- [x] All obsolete commented-out blocks purged from HTML and CSS.
- [x] All HTML, CSS, and JS files strictly obey `snake_case`, zero `:root`, and Font Awesome-only invariants.