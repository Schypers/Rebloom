# Changelog - ReBloom Codebase

All notable changes, bug fixes, UI enhancements, and structural refactors for the ReBloom static application are documented here chronologically.

---

## [2026-11-24] - Hero Section Precision Restoration & Navbar Container Alignment

### 1. Global Navbar Container Edge Alignment (All 5 HTML Pages & `style.css`)
- **Inner Wrapper Alignment (`.nav_container`)**:
  - Wrapped navbar content across all five pages (`index.html`, `product.html`, `product_2.html`, `product_3.html`, `receipt.html`) inside `<div class="nav_container">`.
  - Configured `.nav_container` to match `.container` with `max-width: var(--container_max)` (`75rem` / `1200px`) and `padding-inline: var(--container_gutter)` (`clamp(1rem, 4vw, 2rem)`).
  - Aligned the left edge of the ReBloom logo brand mark and text pixel-for-pixel with the left edge of `.hero_features_card` and all downstream page sections.
- **Mobile Navbar Item Reordering & Drawer Integration**:
  - Implemented `.desktop_only` to hide the top-bar language switcher on viewports `<= 56.25rem` (900px).
  - Added `<li class="nav_lang_item"><div class="lang_switch">...</div></li>` inside the hamburger dropdown drawer (`.nav_mid`), allowing full bilingual toggling from within the mobile menu.
  - Positioned the Cart button (`.btn_cart`) to the left of the mobile hamburger menu toggle (`.nav_menu_btn`), placing the hamburger button at the far right edge of the header.

### 2. Desktop Hero Precision Layout (`>= 48.0625rem` / `769px`) Matching `normal hero_2.png`
- **Two-Block Hero Geometry**:
  - Re-architected the hero section into `.hero_stage` (upper visual poster + copy/CTA) and `.hero_features_card` (floating white 4-item eco card).
  - Maintained natural vertical flex separation (`gap: clamp(8.5rem, 13.5vw, 13.5rem)`) between `.hero_title_stack` and `.hero_bottom_row`, permanently preventing headline collisions with copy and CTA.
- **Interleaved Stacking Context**:
  - Layer 0: Circular pink radial glow (`.hero_glow`).
  - Layer 1: Solid base headline (`.hero_title_back` with `.hero_title_solid` + `.hero_title_script`).
  - Layer 2: Clipped tulip container (`.hero_tulip_clip` with `overflow: hidden; pointer-events: none;`) guaranteeing the stem terminates cleanly at the top border of `.hero_features_card` and cannot poke out underneath.
  - Layer 3: Overlay headline (`.hero_title_front`) with `1.25px` black stroke on `"Decor At"` and transparent script, rendering crisp outline depth over the petals.
- **Flanking Bottom Elements**:
  - `.hero_copy` on the left and `.hero_cta_group` on the right flank the central tulip stem with balanced spacing.

### 3. Mobile Editorial Poster Layout (`<= 48rem` / `768px`, iPhone 16 at `393px`)
- **Stacked 2-Line Headline**:
  - Broke `"Decor At"` and `"Finest"` into 2 prominent stacked lines behind the tulip bloom.
- **Confined Tulip with Bottom Scrim & Fade-out**:
  - Confined `.hero_tulip_clip` to the upper visual zone with a vertical gradient mask and white gradient scrim (`.hero_tulip_clip::after`), softly melting the lower stem into white.
  - Positioned `.hero_bottom_row` cleanly below the faded poster with zero text/button collisions.
- **Compact 2x2 Feature Grid**:
  - Transformed `.hero_features_card` into a 2x2 grid on mobile screens, eliminating the bloated 1-column list.

---

## [2026-11-23] - Centralized Design System Token Architecture, rem Typography & Responsive System

### 1. Centralized `:root` Token Architecture (`assets/css/style.css`)
- **Single Source of Truth `:root` Block**:
  - Replaced the deprecated legacy "Zero CSS Variables" guideline with a comprehensive, centralized `:root` CSS custom property architecture matching official ReBloom Design System tokens (`DESIGN SISTEM.png`).
  - Consolidated all brand colors (`--color_primary: #E3475D`, `--color_primary_hover: #C83244`, `--color_primary_alt: #e03e52`), supporting accents (`--color_accent_green: #24CC63`, `--color_accent_pink: #F5B0C4`, soft green/pink tints), surfaces, text shades, and floral swatch hex codes into strict `--snake_case` custom properties.
  - Consolidated font families (`--font_primary: "Telma Variable"`, `--font_secondary: "Figtree"`), spacing steps (`--space_2xs` to `--space_5xl`), border radii (`--radius_sm` to `--radius_pill`), container boundaries (`--container_max: 75rem`), and elevation shadows.

### 2. Scalable `rem` Typography & Proportional Sizing
- **Root Scale & Normalization**:
  - Anchored base sizing to `html { font-size: 100%; scroll-behavior: smooth; overflow-x: clip; }` (`1rem = 16px`).
  - Migrated all hardcoded `px` font sizes across `style.css`, `product.css`, and `receipt.css` to scalable `rem` units (or `var(--text_*)` tokens).
  - Implemented fluid `clamp()` bounds for major display typography:
    - Hero display headline: `clamp(4rem, 11vw, 10rem)` (gracefully scaling from 64px to 160px).
    - Product detail title: `clamp(1.75rem, 4vw, 2.875rem)`.
    - Product price value: `clamp(2rem, 5vw, 3.5rem)`.
    - Related products title: `clamp(1.75rem, 4vw, 3.25rem)`.
  - Converted margins, paddings, gaps, and structural element dimensions to `rem`, strictly retaining `px` only for hairline borders (`1px`/`2px`) and full-pill radii (`9999px`).

### 3. Responsive 7-Breakpoint Architecture & Mobile Drawer Navigation
- **Comprehensive Desktop-First Responsive Grid**:
  - Standardized unified breakpoints: `80rem` (1280px), `64rem` (1024px), `56.25rem` (900px), `48rem` (768px), `40rem` (640px), `30rem` (480px), and `24.5625rem` (393px - iPhone 16).
  - Guaranteed zero horizontal scrolling (`scrollWidth <= innerWidth`) from 360px to 1440px+.
  - Dedicated iPhone 16 (393px × 852px) optimizations: compact logo sizing, cart badge hiding text on small screens, touch target enforcement (>= 44px for buttons and swatches).
- **Responsive Mobile Navigation Drawer**:
  - Added accessible hamburger button `<button type="button" class="nav_menu_btn" aria-label="Toggle navigation menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>` to all 5 HTML templates.
  - Styled full-width floating dropdown drawer on `style.css` at `<= 56.25rem` (900px).
  - Implemented isolated, accessible `init_mobile_nav()` across `assets/js/script.js`, `assets/js/product.js`, and `assets/js/receipt.js` to toggle `.is_open`, swap `fa-bars` ↔ `fa-xmark`, update `aria-expanded`, close on link click, and auto-dismiss on window resize above 900px.
- **iOS Safari Guardrails**:
  - Added `viewport-fit=cover` to `<meta name="viewport">` across all 5 HTML pages.
  - Implemented `@supports` block for `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
  - Added input font-size normalization (`font-size: max(1rem, 16px)`) to completely eliminate iOS Safari automatic zoom on focus.
  - Added `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` across interactive controls.

### 4. Stylesheet Loading & Redundancy Pruning
- **Receipt Page Stylesheet Hierarchy**:
  - Updated `receipt.html` to load `assets/css/style.css` FIRST, followed by `assets/css/receipt.css`.
  - Pruned ~180 lines of duplicated font imports, resets, navbar, lang switch, and button styles from `receipt.css`.
  - Pruned duplicated `.btn_cart` and `.cart_icon` rules from `product.css`.
  - Added 4 responsive breakpoints (`56.25rem`, `40rem`, `30rem`, `24.5625rem`) to `receipt.css`, which previously lacked responsive rules.

### 5. Documentation Synchronization
- Synchronized `AGENT.md`, `Design_System.md`, `variables.md`, `architecture.md`, and `PRD.md` with the new `:root` design token architecture, `rem` typography scale, and responsive guidelines.

---

## [2026-11-11] - WhatsApp Contact Form Handoff Implementation

### 1. Dynamic WhatsApp Inquiry Dispatch (`assets/js/script.js`, `assets/js/product.js`)
- **Static Alert Replacement**:
  - Replaced legacy static `alert()` mock submission handler on `#contact_form` across `assets/js/script.js` (for `index.html`) and `assets/js/product.js` (for `product.html`, `product_2.html`, and `product_3.html`).
- **Input Harvesting & Validation**:
  - Extracted and trimmed Name (`sender_name`), Email Address (`sender_email`), and Message (`sender_message`).
  - Added strict sequential field validation that focuses the first empty control and aborts submission if any input is missing.
- **Bilingual Message Formatting (`build_contact_wa_url`)**:
  - Leveraged `get_saved_lang()` to retrieve active language (`"ENG"` default / `"IDN"` alternate).
  - Formatted structured inquiry payloads with sender name, email, and questions.
- **WhatsApp API Dispatch & Lifecycle**:
  - Routed inquiries to ReBloom Admin WhatsApp number `6282132829795` using `https://wa.me/6282132829795?text=...`.
  - Opened chat in a new browser tab (`_blank`) with seamless fallback to `window.location.href` if popup window creation is blocked.
  - Automatically called `contact_form.reset()` upon handoff initiation.

### 2. Documentation Synchronization
- **`PRD.md`**: Updated Section 4.1, 4.2, 5.3, and 6 to document the WhatsApp inquiry mechanics, bilingual templates, URL contracts, and acceptance checklist.
- **`architecture.md`**: Updated Section 1 and Section 6 to document the decoupled `#contact_form` handoff architecture.
- **`AGENT.md`**: Updated Section 2 to include the WhatsApp Contact Form Handoff invariant.
- **`variables.md`**: Registered `admin_wa_number`, `build_contact_wa_url`, `handle_contact_submit`, `sender_name`, `sender_email`, and `sender_message`.

---

## [2026-11-11] - Bilingual Translation (i18n) System Implementation

### 1. Unified Cross-Page Bilingual Engine (`index.html`, `product*.html`, `receipt.html`, `assets/js/*.js`)
- **Default & Alternate Languages**:
  - English (`ENG`) set as default across all pages.
  - Indonesian (`IDN`) supported as alternate language.
  - `<html lang="en">` initialized statically, toggled dynamically to `<html lang="id">` when `IDN` is selected.
- **Persistent State Management (`rebloom_lang`)**:
  - Stores active language in `localStorage` under `rebloom_lang`.
  - Implemented `get_saved_lang()` with safe fallback to `"ENG"` for missing/corrupt values.
  - Implemented `set_active_lang(target_lang)` to update `localStorage`, document `lang`, `.lang_switch .lang_btn` `.active` classes, and trigger page translation.
  - On `DOMContentLoaded`, each page script reads `rebloom_lang` and applies translations before or alongside dynamic hydration.
- **Language Switcher UI (`.lang_switch .lang_btn`)**:
  - Updated all HTML headers (`index.html`, `product.html`, `product_2.html`, `product_3.html`, `receipt.html`) so `.lang_btn` for `IDN` is inactive and `ENG` is `.active` by default.
  - Added `data-lang="IDN"` and `data-lang="ENG"` attributes to buttons.
- **Data Attribute Integration (`data-i18n`, `data-i18n-placeholder`)**:
  - Applied `data-i18n` attributes across translatable static elements in all HTML templates.
  - Applied `data-i18n-placeholder` attributes across input and textarea elements (contact form, note inputs).
- **DOM & Icon Preservation**:
  - Ensured Font Awesome `<i>` icons and dynamic counter spans (`#cart_count_highlight`, `#summary_item_count`) are never destroyed during translation by placing `data-i18n` on target text spans or parameterizing dynamic values.

### 2. Page-Specific Implementations
- **Landing Page (`index.html`, `assets/js/script.js`)**:
  - Built comprehensive `landing_translations` dictionary covering Navbar, Hero, Features bar, Vision/Mission, Origin, Why Choose Us, 3 Product cards, FAQ accordion (4 questions & answers), Contact form, and Footer.
  - Localized contact form submission alert (`contact_success_alert`).
- **Product Pages (`product.html`, `product_2.html`, `product_3.html`, `assets/js/product.js`)**:
  - Expanded `pack_catalog` with bilingual metadata fields: `title_en`, `title_id`, `desc_en`, `desc_id`, `category_en`, `category_id`.
  - Built `product_translations` dictionary for shared navigation, ratings (`5.0 | 12 Reviews` vs `5.0 | 12 Ulasan`), configurator labels (`Flower Color` / `Warna Bunga`, `Quantity` / `Jumlah`, `Note` / `Catatan`), note placeholder, trust badge, buy button (`BUY NOW` / `BELI SEKARANG`), related products heading/description, and related switch button (`Switch / Order Pack` / `Ganti / Pesan Paket`).
  - Updated `render_pack_details` and `render_related_packs` to re-render in the active language dynamically.
- **Shopping Cart & Receipt Page (`receipt.html`, `assets/js/receipt.js`)**:
  - Built `receipt_translations` dictionary for navigation, cart subheader, empty cart card, populated cart items, unit price labels, notes, order summary labels, free badges (`FREE` / `GRATIS`), and checkout footnote.
  - Updated `render_cart_view` to dynamically localize category badges, item titles via `catalog_defaults`, note pills (`Note: None` / `Catatan: Tidak ada`), review text (`Reviewing X items selected for checkout` / `Meninjau X produk untuk checkout`), and subtotal labels.
  - Localized WhatsApp Pre-Order message payload into Indonesian or English based on `rebloom_lang`.

### 3. Documentation Synchronization
- Updated `architecture.md`, `PRD.md`, `Design_System.md`, and `AGENT.md` to document the persistent bilingual translation system, `rebloom_lang` key, `ENG` default state, and one-to-one script isolation.

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
