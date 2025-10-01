
# Analytics Test Site (GitHub Pages)

A minimal static site for testing analytics tags (page views, product impressions, and add-to-cart).

## Quick Start

1. **Create a new GitHub repo** (public or private).
2. **Upload these files** (or push via git).
3. In GitHub, go to **Settings → Pages** and set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (root)
4. Wait for GitHub Pages to publish. Your site will be at:
   `https://<your-username>.github.io/<repo-name>/`

> If your site appears at a subpath (project pages), all resources here use **relative paths**, so it will work as-is.

## Where to paste your Tag Manager / Web SDK

Open **`_vendor.html`** and paste your vendor snippet(s) there. It is included on every page.

- **Google Tag Manager**: paste the `<script>` in head and the `<noscript>` iframe after `<body>` tag. For this demo, you can include both in `_vendor.html`.
- **Adobe Launch / Web SDK (Alloy)**: paste the Launch/Alloy script in `_vendor.html`.

Once a tag manager is present and your tags are configured to listen to `dataLayer` events, you can verify in your vendor's preview/debug tools and browser Network tab.

## What events fire?

- `page_view` — on each page load with `page.name` and extra props.
- `product_impression` — when a product card becomes 50% visible in the viewport on **Products**.
- `add_to_cart` — when clicking **Add to cart** on **Products** or **Product Detail**.

See events in the on-page **Debug Panel** and DevTools console.

## Local testing

You can test locally before pushing:

```bash
# Option A
python3 -m http.server 8080

# Option B (Node)
npx http-server -p 8080
```

Then open http://localhost:8080

## File structure

```
.
├── _vendor.html              # Put tag manager / Alloy snippets here
├── index.html
├── products.html
├── product.html
├── cart.html
├── index.js
├── products.js
├── product.js
├── cart.js
├── assets/
│   ├── css/style.css
│   └── js/analytics.js       # dataLayer + helper functions
└── README.md
```

## Notes

- IntersectionObserver is used for impressions; threshold = 0.5 (50% visible).
- The `dataLayer.push` is wrapped to echo events into the Debug Panel.
- No PII is sent; all values are dummy.
- Add privacy toggles if you want to simulate consent flows.
