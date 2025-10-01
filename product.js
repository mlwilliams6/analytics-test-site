
import { trackPageView, trackAddToCart } from './assets/js/analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  const product = { id: 'SKU2001', name: 'Widget Pro Max', price: 29.99 };
  trackPageView('product_detail', { section: 'product', sku: product.id });

  document.getElementById('addBtn').addEventListener('click', () => {
    trackAddToCart({ ...product, quantity: 1 });
    alert('Added to cart');
  });
});
