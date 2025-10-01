
import { trackPageView, trackProductImpressions, trackAddToCart } from './assets/js/analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  trackPageView('products', { section: 'catalog' });

  // Fake products
  const products = [
    { id: 'SKU1001', name: 'Widget Alpha', price: 9.99, list: 'Featured' },
    { id: 'SKU1002', name: 'Widget Beta',  price: 12.49, list: 'Featured' },
    { id: 'SKU1003', name: 'Widget Gamma', price: 19.00, list: 'Featured' },
    { id: 'SKU1004', name: 'Widget Delta', price: 7.49, list: 'Featured' }
  ];

  // Render
  const grid = document.getElementById('productGrid');
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-sku', p.id);
    card.setAttribute('data-name', p.name);
    card.setAttribute('data-price', p.price);
    card.innerHTML = \`
      <h3>\${p.name}</h3>
      <p>SKU: \${p.id}</p>
      <p>$\${p.price.toFixed(2)}</p>
      <button class="btn addBtn">Add to cart</button>
    \`;
    grid.appendChild(card);
  });

  // Impression tracking via IntersectionObserver (fires once per item)
  const seen = new Set();
  const io = new IntersectionObserver(entries => {
    const toSend = [];
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const id = el.getAttribute('data-sku');
        if (!seen.has(id)) {
          seen.add(id);
          toSend.push({
            id,
            name: el.getAttribute('data-name'),
            price: Number(el.getAttribute('data-price')),
            list: 'Featured'
          });
        }
      }
    });
    if (toSend.length) trackProductImpressions(toSend);
  }, { root: null, threshold: 0.5 });

  document.querySelectorAll('.card').forEach(el => io.observe(el));

  // Add to cart button
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.addBtn');
    if (!btn) return;
    const card = btn.closest('.card');
    const item = {
      id: card.getAttribute('data-sku'),
      name: card.getAttribute('data-name'),
      price: Number(card.getAttribute('data-price')),
      quantity: 1
    };
    trackAddToCart(item);
    alert(\`Added \${item.name} to cart\`);
  });
});
