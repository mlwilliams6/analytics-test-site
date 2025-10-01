// /js/app.js

const PRODUCTS = [
  { id: "SKU-1001", name: "Alpha Widget", price: 9.99 },
  { id: "SKU-1002", name: "Beta Widget",  price: 14.99 },
  { id: "SKU-1003", name: "Gamma Widget", price: 19.99 },
  { id: "SKU-1004", name: "Delta Widget", price: 29.99 }
];

// ----- Renderers -----

function renderProducts(containerSelector) {
  const el = document.querySelector(containerSelector);
  el.innerHTML = PRODUCTS.map(p => `
    <div class="card product" data-sku="${p.id}">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <button class="btn-add" data-sku="${p.id}">Add to Cart</button>
      </div>
    </div>
  `).join("");

  // Wire add-to-cart
  el.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (!btn) return;
    const product = PRODUCTS.find(x => x.id === btn.dataset.sku);
    addToCart(product);
    trackAddToCart(product);
  });
}

function renderCart(containerSelector) {
  const el = document.querySelector(containerSelector);
  const cart = getCart();
  if (!cart.length) {
    el.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  el.innerHTML = cart.map(item => `
    <div class="cart-row">
      <span>${item.name}</span>
      <span>Qty: ${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join("");
}

// ----- Cart storage -----

function getCart() {
  try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
  catch { return []; }
}

function saveCart(items) {
  localStorage.setItem("cart", JSON.stringify(items));
}

function addToCart(product) {
  const items = getCart();
  const found = items.find(i => i.id === product.id);
  if (found) found.qty += 1;
  else items.push({ ...product, qty: 1 });
  saveCart(items);
}

// ----- Impressions via IntersectionObserver -----

function setupProductImpressionTracking(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!("IntersectionObserver" in window)) {
    // Fallback: track all as impressions on load
    container.querySelectorAll(".product").forEach(card => {
      const sku = card.dataset.sku;
      const product = PRODUCTS.find(p => p.id === sku);
      trackProductImpression(product);
    });
    return;
  }

  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sku = entry.target.dataset.sku;
        if (!seen.has(sku)) {
          const product = PRODUCTS.find(p => p.id === sku);
          trackProductImpression(product);
          seen.add(sku);
        }
      }
    });
  }, { threshold: 0.5 });

  container.querySelectorAll(".product").forEach(card => io.observe(card));
}
