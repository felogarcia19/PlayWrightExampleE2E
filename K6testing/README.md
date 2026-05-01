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
# or with JSON output for result analysis
npm run test:json
# or direct K6 command
k6 run src/scenarios/smokeTest.js
```

#### Load Test (10 VUs, 5 minutes with ramp-up/down)
```bash
npm run test:load
# with JSON output
npm run test:load:json
```

#### Stress Test (Variable VUs up to 50)
```bash
npm run test:stress
# with JSON output
npm run test:stress:json
```

#### Spike Test (Sudden increase to 100 VUs)
```bash
npm run test:spike
# with JSON output
npm run test:spike:json
```

#### Local Quick Test (1 VU, 10 seconds)
```bash
npm run test:local
```

### Exporting Results

K6 natively exports JSON results that can be used for detailed analysis and integration with CI/CD pipelines:

```bash
# Export to JSON file
k6 run --out json=results.json src/scenarios/smokeTest.js

# View results
cat results.json
```

Results are automatically saved to `results.json` when using `npm run test:*:json` commands.

## � Project Structure

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
│   ├── preserve-results-history.js  # Archive results for history tracking
│   └── analyze-results.js      # Parse and display results summary
├── results/                    # Test results (generated)
│   └── history/                # Result history (generated)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Node dependencies (dev utilities)
└── README.md                   # This file
```

### Results Directory Structure
```
results/
├── results.json                # Latest test results
└── history/
    ├── results-smoke-2026-05-01T120000-000Z.json
    ├── results-load-2026-05-01T110000-000Z.json
    └── results-stress-2026-05-01T100000-000Z.json
```

## 🏗️ Architecture

### Page Object Model (POM)

The POM pattern separates test logic from API interactions, ensuring maintainability and reusability:

**Benefits:**
- ✅ **Reusability** - Define endpoints once, use in multiple test scenarios
- ✅ **Maintainability** - Update endpoint logic in one place
- ✅ **Readability** - Tests read like business requirements
- ✅ **Scalability** - Add new endpoints without modifying test logic

#### BaseApi.js
Provides common HTTP request functionality for all API requests:
```javascript
get(endpoint, params, name)        // Make GET request
post(endpoint, body, params, name)  // Make POST request
checkStatus(response, expected)     // Verify HTTP status
checkResponseTime(response, ms)     // Verify response time threshold
checkBodyContains(response, text)   // Verify content in response
parseJson(response)                 // Parse JSON response
group(name, fn)                     // Group related requests
```

#### SiteApi.js
Implements site-specific endpoints built on BaseApi:
```javascript
loadHomepage()      // GET /
loadAboutPage()     // GET /about/
loadProductsPage()  // GET /products/
loadContactPage()   // GET /contact/
searchProducts(q)   // GET /?s=query
```

**Usage Example:**
```javascript
import { SiteApi } from '../pom/SiteApi.js';

export default function () {
  const api = new SiteApi();
  
  // Load homepage
  const response = api.loadHomepage();
  
  // Perform checks
  api.checkStatus(response, 200);
  api.checkResponseTime(response, 3000);
  api.checkBodyContains(response, 'Prelude');
}
```

### Test Data Organization

All test data is separated from test logic in `src/data/testData.js`:

```javascript
export const smokeTestData = {
  endpoints: {
    homepage: {
      path: '/',
      expectedStatus: 200,
      expectedContent: 'Prelude',
      description: 'Homepage',
    },
    // More endpoints...
  },
  searchQueries: ['speaker', 'amplifier'],
};

export const loadTestData = {
  userJourneys: [
    {
      name: 'Browse & Search',
      steps: [
        { endpoint: '/', description: 'View homepage' },
        { endpoint: '/products/', description: 'Browse products' },
      ],
    },
    // More journeys...
  ],
};
```

**Benefits:**
- ✅ Easy to update endpoint paths
- ✅ Centralized test data
- ✅ Reusable across scenarios
- ✅ Easy to add new test data without modifying code

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

## � Understanding Metrics

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

## 📊 Results & Reporting

### JSON Result Export

K6 exports detailed JSON results that capture every request, metric, and threshold:

```bash
# Run test and export to JSON
npm run test:json

# Results file created: results.json
# Contains: metrics, data points, requests, thresholds, summaries
```

### Result File Structure

The `results.json` contains:
- **Data** - Array of individual request metrics
- **Metrics** - Aggregated performance data (response times, error rates, etc.)
- **Options** - Test configuration that was used
- **Summary** - High-level test results

### Analyzing Results

View test summary in console output (after test completes):
```
✓ Get Homepage
✗ Get Products          # Failed checks marked with ✗

http_reqs..................: 150 150/s
http_req_duration..........: avg=45.2ms p(95)=89.3ms p(99)=102.4ms max=201.2ms
http_req_failed............: 5%
http_reqs{status:200}......: 95%
```

### Allure Integration

For detailed reporting similar to Playwright and APITesting Allure integration:

**Option 1: Cloud-based (Recommended for CI/CD)**
- Use [K6 Cloud](https://k6.io/cloud/) for comprehensive dashboards and result history
- Integrates with your K6 account
- View trends, comparisons, and alerts

**Option 2: Local JSON Analysis**
- Export JSON results (`npm run test:*:json`)
- Parse with custom scripts or tools
- Integrate with CI/CD for automated analysis

**Option 3: JUnit XML Export (for CI/CD integration)**
```bash
# K6 can output JUnit XML for CI/CD systems
k6 run --out json=results.json src/scenarios/smokeTest.js

# The JSON results can be converted to JUnit XML for Jenkins, GitLab CI, etc.
```

### Analyzing Results

Analyze test results with built-in scripts:

```bash
# After running: npm run test:json

# View formatted summary
node scripts/analyze-results.js results.json

# Analyze specific historical result
node scripts/analyze-results.js results/history/results-load-2026-05-01T110000-000Z.json
```

**Output Example:**
```
📊 K6 Test Results Summary

──────────────────────────────────────────────

⏱️  Response Times (ms)
   Min:    45.23
   Avg:    125.67
   p(95):  250.45
   p(99):  380.12
   Max:    1205.78

❌ Error Rate
   Failed: 0.50%

📈 Total Requests
   Count:  1500

──────────────────────────────────────────────
```

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

### Custom POM Class

Create `src/pom/CustomApi.js` for specialized endpoint groups:

```javascript
import { BaseApi } from './BaseApi.js';

export class CustomApi extends BaseApi {
  /**
   * Get custom data endpoint
   */
  getCustomData(id) {
    return this.get(`/api/data/${id}`, {}, 'Get Custom Data');
  }

  /**
   * Post custom data
   */
  postCustomData(data) {
    return this.post('/api/data', JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    }, 'Post Custom Data');
  }
}
```

## 🚀 CI/CD Integration

### GitHub Actions Workflow

Create `.github/workflows/k6-performance-tests.yml`:

```yaml
name: K6 Performance Tests

on:
  schedule:
    - cron: '0 2 * * 0'  # Weekly at 2 AM UTC on Sunday
  workflow_dispatch:     # Manual trigger

jobs:
  k6-smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: grafana/setup-k6-action@v1
      
      - name: Run smoke test
        run: k6 run --out json=results.json K6testing/src/scenarios/smokeTest.js
      
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: k6-smoke-results
          path: results.json

  k6-load:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: grafana/setup-k6-action@v1
      
      - name: Run load test
        run: k6 run --out json=results.json K6testing/src/scenarios/loadTest.js
      
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: k6-load-results
          path: results.json
```

### Environment Variables in CI

Set these in GitHub Actions secrets for your workflow:
- `BASE_URL` - Target URL
- `SMOKE_VUS` - Virtual users for smoke test
- `LOAD_VUS` - Virtual users for load test

## 📊 Performance Benchmarking

### Baseline Establishment

1. **Run initial baseline**
   ```bash
   npm run test:load:json
   ```

2. **Document baseline metrics**
   - `p(95)` response time
   - Error rate
   - Requests per second

3. **Compare future runs**
   - Are response times increasing? (degradation?)
   - Is error rate changing? (reliability issues?)
   - Can we handle same load? (consistency?)

### Regression Detection

Track metrics over time:
```
Date       | p(95) | Error Rate | Status
-----------|-------|------------|--------
2026-05-01 | 150ms | 0.5%       | ✅ Baseline
2026-05-08 | 180ms | 1.2%       | ⚠️ Degradation
2026-05-15 | 145ms | 0.3%       | ✅ Improved
```

## 🐛 Troubleshooting

### Tests failing with network errors
- Check `BASE_URL` is correct and accessible
- Verify firewall/proxy settings
- Try from different network
- Check target site status: `curl https://preludeelectronics.com`

### Response times exceeding threshold
- This is expected under high load (stress/spike tests)
- Check server logs for bottlenecks
- Consider infrastructure scaling
- Identify slowest endpoints: check `http_req_duration` breakdown

### Too many errors (>1%)
- Check if site is having issues
- Verify test data is correct
- Check for rate limiting (503 errors)
- Review request headers and content types
- Verify endpoints in test data match actual site structure

### "Command not found: k6"
- K6 not installed. Install via:
  - **Windows:** `choco install k6`
  - **Mac:** `brew install k6`
  - **Linux:** `sudo apt-get install k6` or `sudo dnf install k6`
  - Or visit: https://k6.io/docs/getting-started/installation/

### "Module not found" errors
- Ensure you're in the K6testing directory: `cd K6testing`
- Check imports use correct relative paths
- Verify files exist in `src/pom/` and `src/data/`

### Results.json not created
- Ensure script runs successfully (check output for errors)
- Verify disk space available
- Try explicit path: `k6 run --out json=./results.json src/scenarios/smokeTest.js`

### High memory usage during tests
- Reduce VU count (--vus parameter)
- Reduce test duration
- Check for memory leaks in custom code
- Run on machine with more available memory

### Tests pass locally but fail in CI/CD
- Verify environment variables are set in CI/CD
- Check BASE_URL is accessible from CI/CD runner
- Ensure K6 version matches locally and in CI
- Review firewall rules for CI/CD network

## 📊 Performance Interpretation Guide

### Good Performance Indicators
✅ `p(95) < 1000ms` - Response times consistent  
✅ `p(99) < 2000ms` - Even slow requests are acceptable  
✅ Error rate < 1% - Very few failures  
✅ Checks passing - All validations successful  

### Warning Signs
⚠️ `p(95) > 2000ms` - Slower than expected  
⚠️ `p(99) > 5000ms` - Significant variance  
⚠️ Error rate 1-5% - Concerning failures  
⚠️ Dropped connections - Network or server issues  

### Critical Issues
🔴 `p(95) > 5000ms` - Unacceptable performance  
🔴 Error rate > 5% - System is failing  
🔴 Many timeout errors - Server overloaded  
🔴 Memory/CPU maxed out - Infrastructure limit hit  

## ✅ Best Practices

### Test Design
- **Start with Smoke** - Validate basic functionality before load testing
- **Use Realistic Load** - Match actual user patterns (ramp-up/down)
- **Group Related Requests** - Use `group()` to organize logical flows
- **Set Realistic Thresholds** - Base on business requirements, not random numbers
- **Test Continuously** - Schedule tests regularly to catch regressions

### Code Quality
- **Follow POM Pattern** - Centralize endpoint logic in POM classes
- **Separate Data** - Keep test data in `src/data/` directory
- **Use Descriptive Names** - `loadHomepage()` is better than `get1()`
- **Add Comments** - Document complex test logic or threshold reasoning
- **Reuse Code** - Extend `BaseApi` instead of duplicating logic

### Performance Testing
- **Run in Stages** - Smoke → Load → Stress
- **Isolate Variables** - Change one thing at a time
- **Warm Up** - Allow system to initialize before testing
- **Cool Down** - Gradually ramp down to prevent edge effects
- **Monitor Infrastructure** - Check CPU/Memory during tests

## 🔄 Test Workflow

1. **Development**
   ```bash
   # Create/update test
   # Run locally
   npm run test
   npm run test:local
   ```

2. **Validation**
   ```bash
   # Export results for analysis
   npm run test:json
   node scripts/analyze-results.js results.json
   ```

3. **CI/CD Integration**
   ```bash
   # Commit and push
   git add K6testing/
   git commit -m "perf: update load tests"
   git push
   # GitHub Actions runs tests automatically
   ```

4. **Monitoring**
   - Review results in artifacts
   - Compare with previous runs
   - Alert on threshold breaches

## 📋 Real-World Examples

### Example 1: Testing Product Search Performance

```javascript
// src/data/productSearch.data.js
export const searchPerformanceData = {
  queries: [
    { term: 'speaker', expected: 'results' },
    { term: 'amplifier', expected: 'product' },
    { term: 'audio cable', expected: 'items' },
  ],
};

// src/pom/SearchApi.js
export class SearchApi extends BaseApi {
  searchProducts(query) {
    return this.get(`/?s=${encodeURIComponent(query)}`, {}, `Search: ${query}`);
  }
}

// src/scenarios/searchLoadTest.js
import { SearchApi } from '../pom/SearchApi.js';
export default function () {
  const api = new SearchApi();
  const query = searchPerformanceData.queries[
    Math.floor(Math.random() * searchPerformanceData.queries.length)
  ];
  const response = api.searchProducts(query.term);
  api.checkStatus(response, 200);
  api.checkResponseTime(response, 2000);
}
```

### Example 2: Multi-Step User Journey

```javascript
// Simulate realistic user: Browse → Search → View Product → Contact
export default function () {
  const api = new SiteApi();
  
  api.group('Complete User Journey', () => {
    // Step 1: Browse homepage
    let response = api.loadHomepage();
    api.checkStatus(response, 200);
    
    // Step 2: Search for product
    response = api.get('/?s=amplifier');
    api.checkStatus(response, 200);
    
    // Step 3: View about page
    response = api.loadAboutPage();
    api.checkStatus(response, 200);
    
    // Step 4: Contact form
    response = api.loadContactPage();
    api.checkStatus(response, 200);
  });
}
```

## 🔗 Comparison with Other Testing Frameworks

| Feature | K6 | Playwright (E2E) | Vitest (API) |
|---------|-----|-----------------|--------------|
| **Purpose** | Load/Performance | Browser Automation | Unit/Integration |
| **Language** | JavaScript/Go | JavaScript | JavaScript |
| **Parallelization** | Built-in | Via config | Via config |
| **Result Export** | JSON, Cloud | JSON, HTML | JSON, Allure |
| **Learning Curve** | Easy | Medium | Easy |
| **CI/CD** | Excellent | Excellent | Excellent |
| **Best For** | Performance bottlenecks | UI validation | API contracts |

## 📚 Additional Resources

- [K6 Documentation](https://k6.io/docs/)
- [K6 HTTP API](https://k6.io/docs/javascript-api/k6-http/)
- [K6 Best Practices](https://k6.io/docs/testing-guides/load-testing-best-practices/)
- [K6 Thresholds](https://k6.io/docs/using-k6/thresholds/)
- [K6 Execution Context](https://k6.io/docs/using-k6/execution-context-variables/)
- [K6 Results API](https://k6.io/docs/results-output/)
- [K6 Cloud](https://k6.io/cloud/)

## 🤝 Contributing

1. Follow the POM pattern for new tests
2. Keep test data separate from test logic in `src/data/`
3. Use descriptive names for endpoints and checks
4. Document complex test scenarios
5. Update this README with new scenarios
6. Test changes locally before committing
7. Export JSON results for analysis: `npm run test:*:json`
8. Use analysis scripts to validate results

## 📝 License

MIT - See LICENSE file for details

## 🏛️ Architecture Alignment

This K6 project follows the same architectural patterns as the companion projects:

- **Playwright E2E Testing** - Browser automation with POM, Allure reporting, GitHub Actions CI/CD
- **APITesting** - API contract testing with POM, Vitest, Allure reporting
- **K6testing** - Load/performance testing with POM, JSON export, GitHub Actions CI/CD

All three projects use:
- ✅ Page Object Model pattern
- ✅ Separated test data from test logic
- ✅ GitHub Actions for CI/CD
- ✅ Comprehensive README documentation
- ✅ Version control best practices

---

**Last Updated**: May 1, 2026  
**K6 Version**: Recommended v0.50+  
**Node.js**: v18+  
**Git Branch**: `K6testing`  
**Repository**: [PlayWrightExampleE2E](https://github.com/felogarcia19/PlayWrightExampleE2E)
