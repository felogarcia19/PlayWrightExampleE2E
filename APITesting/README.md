# APITesting

Modern API testing project for https://preludeelectronics.com built with Node.js, Express, Vitest, Supertest, and Allure.

This project is designed to be simple to run, clear to maintain, and ready for portfolio/demo use.

---

## What this project does

- Exposes a lightweight Express service for diagnostics and smoke checks.
- Tests website availability and response details through a clear API contract.
- Applies a POM-style structure for API tests (objects, fixtures, and data files).
- Generates Allure reports with history support so trends can be tracked across runs.

---

## Endpoints under test

- GET /health
- GET /api/site/summary

### GET /health

Returns service metadata:

- service name
- status
- timestamp

### GET /api/site/summary

Probes the target site and returns:

- url
- ok flag
- statusCode
- contentType
- title
- responseTimeMs

If probing fails, it returns a controlled error payload.

---

## Architecture (POM for API tests)

This project uses a Page Object Model style adapted for API testing:

- API Objects: endpoint-specific classes encapsulating request actions.
- Data Files: expected values and accepted status rules.
- Fixtures: context builder that wires app + request agent + API objects.
- Specs: assertion-only test files with minimal boilerplate.

```text
APITesting/
|-- src/
|   |-- app.js
|   |-- config.js
|   |-- server.js
|   \-- siteProbe.js
|
|-- tests/
|   |-- pom/
|   |   |-- BaseApi.js
|   |   |-- HealthApi.js
|   |   \-- SiteSummaryApi.js
|   |
|   |-- fixtures/
|   |   \-- apiContext.js
|   |
|   |-- data/
|   |   |-- health.data.js
|   |   \-- siteSummary.data.js
|   |
|   |-- health.test.js
|   \-- siteSummary.test.js
|
|-- scripts/
|   \-- preserve-allure-history.js
|
|-- .env.example
|-- package.json
|-- vitest.config.js
\-- README.md
```

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Getting started

### 1) Go to this folder

```bash
cd Playwright/APITesting
```

### 2) Install dependencies

```bash
npm install
```

### 3) Optional environment configuration

```bash
cp .env.example .env
```

Set values as needed:

- TARGET_URL (default: https://preludeelectronics.com/)
- PORT (default: 4000)
- REQUEST_TIMEOUT_MS (default: 12000)

---

## Available scripts

- npm run dev
	- Starts Express server in watch mode.

- npm run start
	- Starts Express server.

- npm test
	- Runs API tests with Vitest.

- npm run test:watch
	- Runs Vitest in watch mode.

- npm run allure:generate
	- Preserves previous history and generates Allure report.

- npm run allure:open
	- Opens generated Allure report in browser.

- npm run allure:run
	- Runs tests, generates Allure report, and opens it.

---

## Allure reporting and history

Allure is integrated through allure-vitest and allure-commandline.

History support is enabled by scripts/preserve-allure-history.js:

1. It copies allure-report/history to allure-results/history before generation.
2. Then allure generate builds a new report while keeping trend data.

Typical flow:

```bash
npm test
npm run allure:generate
npm run allure:open
```

---

## Troubleshooting

### Tests fail due to network/target instability

- Check internet access.
- Verify TARGET_URL is reachable.
- Increase REQUEST_TIMEOUT_MS in .env.

### Allure report opens but shows no tests

- Run npm test first (this creates allure-results).
- Then run npm run allure:generate.

### Wrong folder error (package.json not found)

- Make sure commands are executed from Playwright/APITesting, not a parent folder.

---

## Tech stack

- Express
- Undici
- Vitest
- Supertest
- Allure (allure-vitest + allure-commandline)
