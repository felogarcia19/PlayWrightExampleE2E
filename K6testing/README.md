# K6 Load & Performance Testing

Load and performance testing suite for [preludeelectronics.com](https://preludeelectronics.com) using **K6**, a modern open-source load testing tool built for developers.

## 📊 Features

- **Smoke Testing** - Quick validation of basic functionality with minimal load
- **Load Testing** - Realistic user load simulations for normal operational capacity
- **Stress Testing** - Gradual load increase to identify system limits
- **Spike Testing** - Sudden traffic spikes to test resilience and recovery
- **Page Object Model (POM)** - Clean, maintainable test structure
- **Performance Metrics** - Built-in response time and error rate tracking
- **Configurable Thresholds** - Define acceptable performance criteria

## 🚀 Quick Start

### Prerequisites

- **K6** - [Install K6](https://k6.io/docs/getting-started/installation/)
- **Node.js** v18+ (for development utilities)

### Installation

1. **Setup environment**
   ```bash
   cd K6testing
   cp .env.example .env
   ```

2. **Configure settings in `.env`** (optional, defaults are provided)
   ```env
   BASE_URL=https://preludeelectronics.com
   SMOKE_VUS=2
   LOAD_VUS=10
   ```

### Running Tests

#### Smoke Test (2 VUs, 30 seconds)
```bash
npm run test
# or
k6 run src/scenarios/smokeTest.js
```

#### Load Test (10 VUs, 5 minutes with ramp-up/down)
```bash
npm run test:load
# or
k6 run src/scenarios/loadTest.js
```

#### Stress Test (Variable VUs up to 50)
```bash
npm run test:stress
# or
k6 run src/scenarios/stressTest.js
```

#### Spike Test (Sudden increase to 100 VUs)
```bash
npm run test:spike
# or
k6 run src/scenarios/spikeTest.js
```

#### Local Quick Test (1 VU, 10 seconds)
```bash
npm run test:local
```

## 📁 Project Structure

```
K6testing/
├── src/
│   ├── pom/                    # Page Object Model classes
│   │   ├── BaseApi.js          # Base class with common HTTP operations
│   │   └── SiteApi.js          # Site-specific API endpoints
│   ├── data/                   # Test data and fixtures
│   │   └── testData.js         # Endpoint definitions and test scenarios
│   ├── scenarios/              # Test scenario files
│   │   ├── smokeTest.js        # Smoke test (quick validation)
│   │   ├── loadTest.js         # Load test (normal conditions)
│   │   ├── stressTest.js       # Stress test (find limits)
│   │   └── spikeTest.js        # Spike test (sudden load)
│   ├── utils/                  # Utility functions
│   │   └── config.js           # Configuration and environment helpers
│   └── k6.options.js           # K6 options and configurations
├── scripts/                    # Helper scripts
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Node dependencies (dev utilities)
└── README.md                   # This file
```

## 🏗️ Architecture

### Page Object Model (POM)

The POM pattern separates test logic from API interactions:

#### BaseApi.js
Provides common functionality for all API requests:
- HTTP methods (GET, POST)
- Built-in checks for status, response time, and content
- Response parsing and grouping

```javascript
const api = new SiteApi();
const response = api.get('/products/');
api.checkStatus(response, 200);
api.checkResponseTime(response);
```

#### SiteApi.js
Implements site-specific endpoints:
```javascript
api.loadHomepage()      // GET /
api.loadAboutPage()     // GET /about/
api.loadProductsPage()  // GET /products/
api.searchProducts('speaker') // GET /?s=speaker
```

### Test Data Organization

All test data is separated from test logic in `src/data/testData.js`:

```javascript
export const smokeTestData = {
  endpoints: { /* endpoint definitions */ },
  searchQueries: [ /* search terms */ ]
};

export const loadTestData = {
  userJourneys: [ /* realistic user paths */ ]
};
```

## ⚙️ Configuration

### Environment Variables (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://preludeelectronics.com` | Target URL |
| `SMOKE_VUS` | `2` | Smoke test virtual users |
| `LOAD_VUS` | `10` | Load test virtual users |
| `STRESS_VUS` | `50` | Stress test max VUs |
| `SPIKE_VUS` | `100` | Spike test max VUs |
| `RESPONSE_TIME_THRESHOLD` | `3000` | Max response time (ms) |
| `ERROR_RATE_THRESHOLD` | `0.01` | Max error rate (0-1) |

### K6 Options (src/k6.options.js)

Define test parameters and thresholds:

```javascript
export const smokeTestOptions = {
  vus: 2,                    // Virtual users
  duration: '30s',           // Test duration
  stages: [ /* ramp-up/down */ ],
  thresholds: { /* criteria */ }
};
```

## 📊 Understanding Metrics

### Virtual Users (VUs)
Simulated concurrent users making requests. More VUs = higher load.

### Stages
Ramp-up/down phases to gradually increase or decrease load:
```javascript
stages: [
  { duration: '1m', target: 5 },  // Ramp up to 5 VUs
  { duration: '3m', target: 10 }, // Increase to 10 VUs
  { duration: '1m', target: 0 }   // Ramp down to 0
]
```

### Thresholds
Pass/fail criteria for the entire test:
- `p(95)<3000` — 95th percentile response time under 3 seconds
- `rate<0.01` — Less than 1% error rate
- `status:200>0.95` — At least 95% successful responses

## 🔍 Test Scenarios

### Smoke Test
- **Purpose**: Validate basic functionality
- **Load**: Minimal (2 VUs)
- **Duration**: 30 seconds
- **What it tests**: 
  - Homepage loads
  - Key pages respond with correct content
  - Search functionality works

### Load Test
- **Purpose**: Measure performance under normal load
- **Load**: Gradual ramp-up to 10 VUs
- **Duration**: 5 minutes (1m ramp, 3m sustain, 1m ramp-down)
- **What it tests**:
  - Response times under sustained load
  - System stability over time
  - Realistic user journeys

### Stress Test
- **Purpose**: Find the breaking point
- **Load**: Gradual increase to 50+ VUs
- **Duration**: 25 minutes
- **What it tests**:
  - When does performance degrade?
  - At what point do requests start failing?
  - Where is the system capacity limit?

### Spike Test
- **Purpose**: Test resilience to unexpected traffic
- **Load**: Sudden jump to 100 VUs
- **Duration**: ~3 minutes
- **What it tests**:
  - Can the system handle sudden spikes?
  - Does it recover quickly?
  - Are there cascading failures?

## 📈 Interpreting Results

### Console Output
```
  execution: local
  script: src/scenarios/smokeTest.js
  output: -

  scenarios: (100.00%) 1 scenario, 2 max VUs, 1m0s max duration (incl. 30s graceful stop)

    ✓ Get Homepage
    ✓ Get About
    ✗ Get Products          # Failed check
    
    http_reqs..................: 150 150/s
    http_req_duration..........: avg=45.2ms p(95)=89.3ms p(99)=102.4ms max=201.2ms
    http_req_failed............: 5%          # ERROR RATE
    http_reqs{status:200}......: 95%
    iteration_duration.........: avg=1.5s
    iterations.................: 100
```

**Key metrics to watch:**
- ✅ `http_req_duration` - Response times (should be below thresholds)
- ✅ `http_req_failed` - Error rate (should be low)
- ✅ Check results - All checks should pass
- ✅ `p(95)` - 95th percentile response time (most important)

## 🛠️ Extending Tests

### Adding New Endpoints

1. **Update test data** (`src/data/testData.js`):
```javascript
export const smokeTestData = {
  endpoints: {
    newPage: {
      path: '/new-page/',
      expectedStatus: 200,
      expectedContent: 'Content',
    }
  }
};
```

2. **Add method to SiteApi** (`src/pom/SiteApi.js`):
```javascript
loadNewPage() {
  return this.get('/new-page/', {}, 'Load New Page');
}
```

3. **Use in test scenario** (`src/scenarios/*.js`):
```javascript
api.loadNewPage();
api.checkStatus(response, 200);
```

### Custom Test Scenario

Create new file: `src/scenarios/customTest.js`

```javascript
import { loadTestOptions } from '../k6.options.js';
import { SiteApi } from '../pom/SiteApi.js';

export const options = loadTestOptions;

export default function () {
  const api = new SiteApi();
  
  // Your custom test logic
  api.group('Custom scenario', () => {
    const response = api.get('/custom-endpoint/');
    api.checkStatus(response, 200);
    api.checkResponseTime(response);
  });
}
```

Run it:
```bash
k6 run src/scenarios/customTest.js
```

## 🐛 Troubleshooting

### Tests failing with network errors
- Check `BASE_URL` is correct and accessible
- Verify firewall/proxy settings
- Try from different network

### Response times exceeding threshold
- This is expected under high load (stress/spike tests)
- Check server logs for bottlenecks
- Consider infrastructure scaling

### Too many errors (>1%)
- Check if site is having issues
- Verify test data is correct
- Check for rate limiting (503 errors)

### "Command not found: k6"
- K6 not installed. Run: `choco install k6` (Windows) or visit https://k6.io/docs/getting-started/installation/

## 📚 Additional Resources

- [K6 Documentation](https://k6.io/docs/)
- [K6 HTTP API](https://k6.io/docs/javascript-api/k6-http/)
- [K6 Best Practices](https://k6.io/docs/testing-guides/load-testing-best-practices/)
- [K6 Thresholds](https://k6.io/docs/using-k6/thresholds/)

## 🤝 Contributing

1. Follow the POM pattern for new tests
2. Keep test data separate from test logic
3. Use descriptive names for endpoints and checks
4. Update this README with new scenarios
5. Test changes locally before committing

## 📝 License

MIT - See LICENSE file for details

---

**Last Updated**: May 1, 2026  
**K6 Version**: Recommended v0.50+  
**Node.js**: v18+
