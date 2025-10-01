
import { trackPageView } from './assets/js/analytics.js';
document.addEventListener('DOMContentLoaded', () => {
  trackPageView('cart', { step: 1 });
});
