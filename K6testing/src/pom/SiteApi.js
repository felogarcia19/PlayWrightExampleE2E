import { BaseApi } from './BaseApi.js';

/**
 * Site API object for homepage and general site endpoints
 */
export class SiteApi extends BaseApi {
  /**
   * Load homepage
   * @returns {object} HTTP response
   */
  loadHomepage() {
    return this.get('/', {}, 'Load Homepage');
  }

  /**
   * Load about page
   * @returns {object} HTTP response
   */
  loadAboutPage() {
    return this.get('/about/', {}, 'Load About Page');
  }

  /**
   * Load products page
   * @returns {object} HTTP response
   */
  loadProductsPage() {
    return this.get('/products/', {}, 'Load Products Page');
  }

  /**
   * Load contact page
   * @returns {object} HTTP response
   */
  loadContactPage() {
    return this.get('/contact/', {}, 'Load Contact Page');
  }

  /**
   * Search products
   * @param {string} query - Search query
   * @returns {object} HTTP response
   */
  searchProducts(query = 'speaker') {
    return this.get(`/?s=${encodeURIComponent(query)}`, {}, `Search: ${query}`);
  }
}
