/**
 * Test data for smoke test scenarios
 */

export const smokeTestData = {
  endpoints: {
    homepage: {
      path: '/',
      expectedStatus: 200,
      expectedContent: 'Prelude',
      description: 'Homepage',
    },
    about: {
      path: '/about/',
      expectedStatus: 200,
      expectedContent: 'About',
      description: 'About page',
    },
    products: {
      path: '/products/',
      expectedStatus: 200,
      expectedContent: 'Product',
      description: 'Products page',
    },
    contact: {
      path: '/contact/',
      expectedStatus: 200,
      expectedContent: 'Contact',
      description: 'Contact page',
    },
  },
  searchQueries: ['speaker', 'amplifier', 'audio'],
};

export const loadTestData = {
  // Simulate realistic user journeys
  userJourneys: [
    {
      name: 'Browse & Search',
      steps: [
        { endpoint: '/', description: 'View homepage' },
        { endpoint: '/products/', description: 'Browse products' },
        { endpoint: '/?s=speaker', description: 'Search for speaker' },
      ],
    },
    {
      name: 'Learn About Company',
      steps: [
        { endpoint: '/', description: 'View homepage' },
        { endpoint: '/about/', description: 'Read about page' },
        { endpoint: '/contact/', description: 'View contact page' },
      ],
    },
    {
      name: 'Product Discovery',
      steps: [
        { endpoint: '/products/', description: 'View all products' },
        { endpoint: '/products/category/audio', description: 'View audio products' },
        { endpoint: '/?s=amplifier', description: 'Search amplifiers' },
      ],
    },
  ],
};

export const stressTestData = {
  heavyEndpoints: [
    { path: '/', weight: 50 }, // Homepage - most traffic
    { path: '/products/', weight: 30 },
    { path: '/about/', weight: 10 },
    { path: '/contact/', weight: 10 },
  ],
};
