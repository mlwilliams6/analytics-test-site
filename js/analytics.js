// /js/analytics.js

// Canonical data layer
window.dataLayer = window.dataLayer || [];

// Generic helpers (push to dataLayer and console)
function dlPush(evt) {
  window.dataLayer.push(evt);
  console.log("[DL]", evt);
}

// ---- Public tracking APIs ----

/** Pageview */
function trackPageview({ pageName, siteSection }) {
  dlPush({
    event: "page_view",
    page: { pageName, siteSection, url: location.href }
  });

  // (Optional) If using Adobe Alloy:
  // if (window.alloy) alloy("sendEvent", { xdm: { web: { webPageDetails: { name: pageName }}}});
}

/** Product impression (when a product card becomes visible) */
function trackProductImpression(product) {
  dlPush({
    event: "product_impression",
    ecommerce: {
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price
      }]
    }
  });

  // Optional: alloy("sendEvent", { xdm: { commerce: { productViews: [{ SKU: product.id }]}}});
}

/** Add to cart */
function trackAddToCart(product) {
  dlPush({
    event: "add_to_cart",
    ecommerce: {
      currency: "USD",
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1
      }]
    }
  });

  // Optional: alloy("sendEvent", { xdm: { commerce: { productListAdds: [{ SKU: product.id, priceTotal: product.price }]}}});
}
