# Arvox Space — Project Plan

## 1. Project Description
**Arvox Space** is a Gen Z Print-on-Demand apparel brand selling tees, hoodies, and caps. The website delivers a clean, editorial, high-fashion streetwear experience inspired by premium brands like Materia and Premier. The tone is confident, culture-aware, and minimal.

**Target Users:** Gen Z and young millennial streetwear enthusiasts.
**Core Value:** Premium curated apparel with limited drops, editorial presentation, and seamless shopping.

## 2. Page Structure
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Full landing with hero, collections, featured products, brand banner, styles, social wall, newsletter |
| `/catalog` | Catalog | All product categories grid with filtering |
| `/shop` | Shop | Full product listing with filters, sorting, pagination |
| `/faq` | FAQ | Frequently asked questions |
| `/login` | Login | User authentication |
| `/register` | Register | New user sign up |
| `/account` | Account | User profile & order history (protected) |
| `/product/:id` | Product Detail | Individual product page with variants, images, add to cart |
| `/cart` | Cart | Cart slide-out panel (overlay, not full page) |

## 3. Core Features
- [x] Announcement bar with scrolling marquee
- [x] Fixed navbar with centered logo, nav links, icons
- [x] Hero image slider with dark overlay and CTAs
- [x] Featured collections grid (Hoodies / T-Shirts / Pants / Caps)
- [x] Featured products with tab filters (Bestselling / New Drop / Under $50)
- [x] Full-width brand banner with countdown timer
- [x] Featured styles editorial image grid
- [x] Horizontal scrollable product row
- [x] Instagram social wall grid
- [x] Email newsletter community signup
- [x] Footer with multi-column layout and watermark
- [x] Cart slide-out panel (right side dark overlay)
- [x] User login / registration (Supabase Auth)
- [x] Product detail page with variants, swatches, image gallery
- [x] Shopify product sync (via Supabase Edge Functions)
- [x] Shopify checkout redirect
- [x] Wishlist functionality
- [x] Mobile responsive design
- [x] SEO optimization

## 4. Data Model Design

### Table: users (managed by Supabase Auth)
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| email | text | User email |
| created_at | timestamp | Registration date |

### Table: profiles
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | References auth.users |
| full_name | text | Display name |
| phone | text | Contact number |
| avatar_url | text | Profile image |
| created_at | timestamp | Record creation |

### Table: wishlists
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References auth.users |
| product_id | text | Shopify product ID |
| created_at | timestamp | Record creation |

### Table: cart_items
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References auth.users (nullable for guests) |
| session_id | text | Guest session identifier |
| product_id | text | Shopify product ID |
| variant_id | text | Shopify variant ID |
| quantity | int | Item quantity |
| created_at | timestamp | Record creation |

### Table: newsletter_subscribers
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| email | text | Subscriber email |
| subscribed_at | timestamp | Subscription date |

## 5. Backend / Third-party Integration Plan
- **Supabase:** Authentication (login/register), database (profiles, wishlists, cart, newsletter), storage for any uploaded assets, Edge Functions for Shopify proxy
- **Shopify:** Product catalog sync, inventory, checkout redirect via Storefront API
- **Stripe:** Not needed — Shopify handles payments natively

## 6. Development Phase Plan

### Phase 1: Foundation & Setup
- Goal: Connect Supabase, set up project structure, create project plan, establish base components
- Deliverable: Supabase connected, base UI components created, Tailwind theme configured with brand colors

### Phase 2: Homepage Build
- Goal: Build the complete homepage with all 11 sections
- Deliverable: Fully styled homepage with hero slider, collections, products, brand banner, styles, social wall, newsletter, footer

### Phase 3: Catalog & Shop Pages
- Goal: Build product listing pages with filtering, sorting, and grid layouts
- Deliverable: /catalog and /shop pages with functional filters

### Phase 4: Product Detail & Cart
- Goal: Product detail page with image gallery, variants, swatches, and cart slide-out panel
- Deliverable: /product/:id page, cart drawer with add/remove/update quantity

### Phase 5: Auth & User Pages
- Goal: Login, register, and account pages with Supabase Auth
- Deliverable: /login, /register, /account pages with protected routes

### Phase 6: Shopify Integration
- Goal: Connect Shopify store for real products, sync inventory, enable checkout redirect
- Deliverable: Live Shopify products, working checkout flow

### Phase 7: FAQ & Polish
- Goal: FAQ page, final responsive testing, animations, SEO, performance optimization
- Deliverable: /faq page, smooth scroll animations, meta tags, mobile optimization