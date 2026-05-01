# Prelude Electronics — End-to-End Test Suite

Automated browser tests for [preludeelectronics.com](https://preludeelectronics.com), built with **Playwright** and **TypeScript**.

![Playwright](https://img.shields.io/badge/Playwright-1.49-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088ff?logo=github-actions&logoColor=white)

---

## What this project tests

Every page of the live website is covered:

| Spec file | What is verified |
|-----------|-----------------|
| `navigation.spec.ts` | Menu links are visible, click to the correct URL, and navigate back |
| `homepage.spec.ts` | All three service sections (Audio / Software / Electronics) and their content |
| `about.spec.ts` | Company story, values, and Costa Rica origin |
| `audio.spec.ts` | Tagline, quote, speakers, crossovers, and amplifier listings |
| `electronics.spec.ts` | Quote, category labels (Audio / Power / Communication / Controllers) |
| `software.spec.ts` | Philosophy quote, policies, and application areas |
| `contact.spec.ts` | Location, emails (including `mailto:` href), phone, hours, and Instagram link |

Tests run on **5 browser/device configurations**: Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari.

---

## Architecture

This project follows modern QA engineering patterns:

```
e2e/
├── fixtures/
│   └── index.ts          ← Custom Playwright fixtures (inject page objects into tests)
│
├── pages/                ← Page Object Model — all selectors and locators live here
│   ├── BasePage.ts       ← Shared helpers: nav, footer, text(), heading(), goto()
│   ├── NavigationPage.ts
│   ├── HomePage.ts
│   ├── AboutPage.ts
│   ├── AudioPage.ts
│   ├── ElectronicsPage.ts
│   ├── SoftwarePage.ts
│   └── ContactPage.ts
│
├── data/                 ← Test data — all text, URLs, and patterns live here
│   ├── navigation.data.ts
│   ├── homepage.data.ts
│   ├── about.data.ts
│   ├── audio.data.ts
│   ├── electronics.data.ts
│   ├── software.data.ts
│   └── contact.data.ts
│
├── navigation.spec.ts    ← Spec files — only Playwright assertions, zero raw strings
├── homepage.spec.ts
├── about.spec.ts
├── audio.spec.ts
├── electronics.spec.ts
├── software.spec.ts
└── contact.spec.ts
```

### Three-layer design

| Layer | Responsibility | What to change here |
|-------|---------------|---------------------|
| **Pages** (`pages/`) | Locators and selectors | If the site's HTML structure changes |
| **Data** (`data/`) | Expected text, URLs, patterns | If the site's content changes |
| **Specs** (`e2e/*.spec.ts`) | Test logic and assertions | If new scenarios need to be added |

### Custom fixtures

Page objects are registered as Playwright fixtures so tests receive them already instantiated — no `new SomePage(page)` or `beforeEach` boilerplate required:

```typescript
// Every test in the suite looks like this ↓
test('contact info is displayed', async ({ contactPage }) => {
  await expect(contactPage.text(contactData.contact.primaryEmail)).toBeVisible();
});
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/Playwright
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

> On Linux / CI you may also need system dependencies:
> ```bash
> npx playwright install --with-deps
> ```

### 4. (Optional) Configure the base URL

The tests run against the live site by default. To target a different environment:

```bash
cp .env.example .env
# Edit .env and set BASE_URL=https://your-staging-url.com
```

---

## Running the tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests on all browsers (headless) |
| `npm run test:ui` | Open the interactive Playwright UI |
| `npm run test:headed` | Run with the browser window visible |
| `npm run test:debug` | Open Playwright Inspector for step-by-step debugging |
| `npm run test:chromium` | Run on Chromium only |
| `npm run test:firefox` | Run on Firefox only |
| `npm run test:webkit` | Run on WebKit (Safari engine) only |
| `npm run test:mobile` | Run on Mobile Chrome + Mobile Safari |
| `npm run test:report` | Open the last HTML report |
| `npm run codegen` | Launch Playwright Codegen to record new tests |

---

## Viewing results

After each run an **HTML report** is generated automatically. Open it with:

```bash
npm run test:report
```

Failed tests automatically save:
- A **screenshot** at the moment of failure
- A **video** recording of the full test run
- A **trace file** (on retry) — viewable at [trace.playwright.dev](https://trace.playwright.dev)

---

## CI / CD

The project includes a ready-to-use GitHub Actions workflow at `.github/workflows/playwright.yml`.

On every push or pull request to `main` / `master`:
1. Dependencies are installed via `npm ci`
2. Playwright browsers are downloaded
3. Tests run in **parallel** across Chromium, Firefox, and WebKit
4. HTML reports are uploaded as artifacts (retained 30 days)

To target a different URL in CI, add a repository secret named `BASE_URL`.

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation and test runner |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code |
| [dotenv](https://github.com/motdotla/dotenv) | Environment-based configuration |
| [GitHub Actions](https://docs.github.com/en/actions) | Continuous integration pipeline |
