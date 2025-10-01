
// Minimal, vendor-agnostic dataLayer & helpers
window.dataLayer = window.dataLayer || [];

(function setupDebugPanel(){
  const logEl = document.getElementById('debugLog');
  const originalPush = window.dataLayer.push.bind(window.dataLayer);
  window.dataLayer.push = function(evt){
    const ts = new Date().toISOString();
    const payload = { ts, ...evt };
    try { originalPush(payload); } catch (e) { originalPush(evt); }
    if (logEl) {
      logEl.textContent = JSON.stringify(payload, null, 2) + "\n\n" + logEl.textContent;
    }
    if (window.console && console.log) console.log("[DL push]", payload);
    return window.dataLayer.length;
  };
})();

export function trackPageView(pageName, props = {}) {
  window.dataLayer.push({
    event: "page_view",
    page: { name: pageName, ...props }
  });
}

export function trackProductImpressions(items){
  // items: [{id, name, price, list}, ...]
  if (!Array.isArray(items) || items.length === 0) return;
  window.dataLayer.push({
    event: "product_impression",
    ecommerce: { impressions: items }
  });
}

export function trackAddToCart(item){
  // item: {id, name, price, quantity}
  window.dataLayer.push({
    event: "add_to_cart",
    ecommerce: { items: [item] }
  });
}
