
import { trackPageView } from './assets/js/analytics.js';
document.addEventListener('DOMContentLoaded', () => {
  trackPageView('home', { section: 'landing' });
});
