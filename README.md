# Prelude Electronics - End-to-End Test Suite

Automated browser tests for [preludeelectronics.com](https://preludeelectronics.com), built with **Playwright** + **TypeScript** and **WebdriverIO** + **Appium** for mobile.

| Framework | Language | Platform | Focus |
|-----------|----------|----------|-------|
| **Playwright** | TypeScript | Desktop (Chrome, Firefox, WebKit) + Mobile (Chrome, Safari) | Desktop-first, rapid testing |
| **WebdriverIO** + **Appium** | JavaScript | Android emulator/device + Chrome | Native mobile automation, real device support |

![Playwright](https://img.shields.io/badge/Playwright-1.49-45ba4b?logo=playwright&logoColor=white)
![WebdriverIO](https://img.shields.io/badge/WebdriverIO-9.27-orange?logo=webdriver&logoColor=white)
![Appium](https://img.shields.io/badge/Appium-3.3-purple?logo=appium&logoColor=white)
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
| `contact.spec.ts` | Location, emails, phone, hours, and Instagram link |

Tests run on **5 browser/device configurations**: Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari.

---

## Architecture

This project follows modern QA engineering patterns:

```text
e2e/
|-- fixtures/
|   \-- index.ts          <- Custom Playwright fixtures (inject page objects into tests)
|
|-- pages/                <- Page Object Model - all selectors and locators live here
|   |-- BasePage.ts       <- Shared helpers: nav, footer, text(), heading(), goto()
|   |-- NavigationPage.ts
|   |-- HomePage.ts
|   |-- AboutPage.ts
|   |-- AudioPage.ts
|   |-- ElectronicsPage.ts
|   |-- SoftwarePage.ts
|   \-- ContactPage.ts
|
|-- data/                 <- Test data - all text, URLs, and patterns live here
|   |-- navigation.data.ts
|   |-- homepage.data.ts
|   |-- about.data.ts
|   |-- audio.data.ts
|   |-- electronics.data.ts
|   |-- software.data.ts
|   \-- contact.data.ts
|
|-- navigation.spec.ts    <- Spec files - only Playwright assertions, zero raw strings
|-- homepage.spec.ts
|-- about.spec.ts
|-- audio.spec.ts
|-- electronics.spec.ts
|-- software.spec.ts
\-- contact.spec.ts
```

### Three-layer design

| Layer | Responsibility | What to change here |
|-------|---------------|---------------------|
| **Pages** (`pages/`) | Locators and selectors | If the site's HTML structure changes |
| **Data** (`data/`) | Expected text, URLs, patterns | If the site's content changes |
| **Specs** (`e2e/*.spec.ts`) | Test logic and assertions | If new scenarios need to be added |

### Custom fixtures

Page objects are registered as Playwright fixtures so tests receive them already instantiated:

```typescript
test('contact info is displayed', async ({ contactPage }) => {
  await expect(contactPage.text(contactData.contact.primaryEmail)).toBeVisible();
});
```

---

## Prerequisites

### For Playwright (Desktop)
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### For WebdriverIO + Appium (Mobile/Android)
- Node.js v20+ (for Appium 3.x compatibility)
- npm v10+
- **Windows**: Java 17+ (Microsoft OpenJDK or equivalent)
- **macOS/Linux**: Java 17+, Xcode Command Line Tools
- **Android emulator or physical device**:
  - Android SDK (API 34+)
  - Android emulator with Chrome installed OR physical device with USB debugging enabled
  - 2GB+ available RAM for emulator

---

## Quickstart (5 minutes)

### Clone & Install

```bash
git clone https://github.com/felogarcia19/PlayWrightExampleE2E.git
cd Playwright
npm install
npx playwright install
```

### Run Playwright desktop tests

```bash
npm test                  # Run all browsers headless
npm run test:ui          # Open interactive UI
npm run test:headed      # Run with browser window visible
npm run test:mobile      # Run mobile Chrome + Safari
```

### Run WebdriverIO Android mobile tests

```bash
# First-time setup only (configure Android environment)
npm run appium:driver:doctor

# Then boot emulator + run tests automatically
npm run wdio:boot-and-test          # Windows
npm run wdio:boot-and-test:unix     # macOS/Linux

# Or manually:
npm run wdio:test
```

---

## Complete Setup Guide

### Getting started - Playwright (Desktop)

#### 1. Clone the repository

```bash
git clone https://github.com/felogarcia19/PlayWrightExampleE2E.git
cd Playwright
```

#### 2. Install dependencies

```bash
npm install
npx playwright install
```

Playwright downloads all browser binaries automatically. On Linux/CI, also install system dependencies:

```bash
npx playwright install --with-deps
```

#### 3. (Optional) Configure environment

```bash
cp .env.example .env
# Edit .env to set BASE_URL if testing a staging/local environment
```

#### 4. Run desktop tests

```bash
npm test                  # All tests on all browsers (headless)
npm run test:ui          # Interactive Playwright UI - recommended for development
npm run test:headed      # Same as npm test but with browser visible
npm run test:debug       # Playwright Inspector for step-by-step debugging
npm run test:chromium    # Chromium only
npm run test:firefox     # Firefox only
npm run test:webkit      # WebKit (Safari engine) only
npm run test:mobile      # Mobile Chrome + Mobile Safari
npm run test:report      # Show last test report
```

---

### Getting started - WebdriverIO + Appium (Android Mobile)

#### 1. Clone repository (same as Playwright)

```bash
git clone https://github.com/felogarcia19/PlayWrightExampleE2E.git
cd Playwright
npm install
```

#### 2. Set up Java & Android environment

**Windows:**

```powershell
# Install via winget (automatic environment setup)
winget install --id Microsoft.OpenJDK.17 -e
winget install --id Google.PlatformTools -e
winget install --id Google.AndroidStudio -e

# Or manually set environment variables:
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
$env:ANDROID_HOME = "$env:USERPROFILE\AppData\Local\Android\Sdk"
```

**macOS:**

```bash
# Install via Homebrew
brew install openjdk@17
brew install android-sdk

export JAVA_HOME=/usr/local/opt/openjdk@17
export ANDROID_HOME=/usr/local/share/android-sdk
```

**Linux (Ubuntu):**

```bash
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk android-sdk

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=/usr/lib/android-sdk
```

#### 3. Configure Android SDK and emulator

After setting `ANDROID_HOME`, run:

```bash
# Accept Android licenses
yes | sdkmanager --licenses

# Install required SDK packages
sdkmanager "platform-tools" "emulator" "platforms;android-34" "system-images;android-34;google_apis;x86_64"

# Create an Android Virtual Device (first time only)
avdmanager create avd -n Prelude_Pixel_7 -k "system-images;android-34;google_apis;x86_64" -d pixel_7
```

#### 4. Install Appium driver

```bash
npm run appium:driver:install

# Verify setup
npm run appium:driver:doctor
```

**All checks should pass before proceeding.** If not, refer to [Appium documentation](https://appium.io/docs/en/latest/guides/system-setup/) for your OS.

#### 5. Start emulator and run mobile tests

**Option A: Automatic (boot + test + close)**

```powershell
# Windows
npm run wdio:boot-and-test

# macOS/Linux
npm run wdio:boot-and-test:unix
```

**Option B: Manual (keep emulator open)**

```bash
# Terminal 1: Start emulator
$env:ANDROID_HOME = "C:\Users\<YourUsername>\AppData\Local\Android\Sdk"
$env:ANDROID_HOME/emulator/emulator.exe -avd Prelude_Pixel_7

# Terminal 2: Run tests
npm run wdio:test

# Terminal 3: View logs (optional)
npm run wdio:test:debug
```

---

## Running Tests

## Running Tests

### Playwright (Desktop) Commands

| Command | Result |
|---------|--------|
| `npm test` | All tests on all 5 browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari) in headless mode |
| `npm run test:ui` | **Recommended for dev**: Interactive UI with trace viewer and step-through debugging |
| `npm run test:headed` | Run with visible browser window |
| `npm run test:debug` | Open Playwright Inspector for line-by-line debugging |
| `npm run test:chromium` | Desktop Chrome only |
| `npm run test:firefox` | Desktop Firefox only |
| `npm run test:webkit` | Safari engine only |
| `npm run test:mobile` | Mobile Chrome + Mobile Safari (virtual devices) |
| `npm run test:report` | Open HTML report from last run |

### WebdriverIO (Mobile Android) Commands

| Command | Result |
|---------|--------|
| `npm run wdio:boot-and-test` | **(Windows)** Boot emulator, run all mobile tests, close emulator |
| `npm run wdio:boot-and-test:unix` | **(macOS/Linux)** Same as above |
| `npm run wdio:test` | Run tests on already-running emulator |
| `npm run wdio:test:debug` | Run tests with verbose logging |
| `npm run appium:driver:doctor` | Verify Android/Java/Appium configuration |

### Test Results

Playwright saves artifacts automatically:
- **Screenshots** (on failure)
- **Video recordings** (all tests)
- **Trace files** (on retry) — open at [trace.playwright.dev](https://trace.playwright.dev)
- **HTML report** — view with `npm run test:report`

WebdriverIO logs:
- Appium server log: `test-results/appium.log`
- Test output: console (spec reporter)

---

## Viewing results

Playwright report:

```bash
npm run test:report
```

Allure report:

```bash
npm run allure:generate
npm run allure:open
```

---

## WebdriverIO + Appium Mobile Suite

Full POM-based test automation for **Android emulator** and **physical Android devices** using **Appium** + **UiAutomator2** driver and **Chrome browser**.

### Directory Structure

```text
wdio/
├── wdio.android.conf.js               <- WDIO config + Appium service
├── pageobjects/
│   ├── base.page.js                   <- Shared page helpers (wait, navigate, popups)
│   ├── prelude.home.page.js           <- Homepage POM (open, assert, mobile menu)
│   ├── prelude.navigation.page.js     <- Navigation POM (menu links, sections)
│   ├── prelude.services.page.js       <- Services/cards POM (audio, electronics, software)
│   └── prelude.contact.page.js        <- Contact page POM (emails, form, social)
└── tests/
    ├── prelude.mobile.e2e.js          <- Homepage + mobile menu scenarios
    ├── prelude.navigation.e2e.js      <- Navigation menu scenarios
    ├── prelude.services.e2e.js        <- Service cards + sections scenarios
    └── prelude.contact.e2e.js         <- Contact page scenarios
```

### Test Coverage

**Homepage Mobile** (`prelude.mobile.e2e.js`)
- ✓ Loads Prelude homepage on Android Chrome
- ✓ Opens the mobile menu when present

**Navigation** (`prelude.navigation.e2e.js`)
- ✓ Displays navigation on mobile
- ✓ Navigates to Audio section
- ✓ Navigates to Electronics section
- ✓ Navigates to Software section
- ✓ Navigates to About section

**Services** (`prelude.services.e2e.js`)
- ✓ Displays service cards/sections on homepage
- ✓ Verifies Audio service section exists
- ✓ Verifies Electronics service section exists
- ✓ Verifies Software service section exists
- ✓ Service cards contain text content

**Contact** (`prelude.contact.e2e.js`)
- ✓ Loads contact page successfully
- ✓ Verifies contact page has contact info
- ✓ Displays email contact links
- ✓ Displays Instagram link (if available)

### Writing Custom Tests

Create a new spec file in `wdio/tests/`:

```javascript
const preludeHomePage = require('../pageobjects/prelude.home.page');
const preludeNavigationPage = require('../pageobjects/prelude.navigation.page');

describe('My Custom Mobile Test', () => {
  beforeEach(async () => {
    await preludeHomePage.openHome();
  });

  it('example: verify something on homepage', async () => {
    await preludeNavigationPage.verifyNavigationVisible();
    await expect(browser).toHaveUrl(expect.stringContaining('prelude'));
  });
});
```

### Key Page Object Methods

**BasePage** (inherited by all pages)
- `open(path)` — Navigate to a URL path
- `waitForPageReady()` — Wait for document.readyState
- `closeCommonPopupsIfPresent()` — Dismiss cookies/modals

**PreludeHomePage**
- `openHome()` — Load homepage with readiness check
- `assertCoreContentLoaded()` — Verify page title & body
- `openMobileMenuIfAvailable()` — Click hamburger menu

**PreludeNavigationPage**
- `verifyNavigationVisible()` — Check nav element exists
- `navigateToMenu(menuName)` — Click menu item (audio, electronics, etc.)

**PreludeServicesPage**
- `countServiceCards()` — Get number of service cards
- `getServiceCardText()` — Retrieve all card text
- `verifyServiceSectionExists(sectionName)` — Verify audio/electronics/software

**PreludeContactPage**
- `openContactPage()` — Navigate to /contact
- `getContactEmails()` — Extract mailto links
- `verifyContactPage()` — Check for form or email

### Environment Configuration

`.env.example`:
```dotenv
# Base URL for WDIO tests
WDIO_BASE_URL=https://preludeelectronics.com

# Android emulator/device config
ANDROID_DEVICE_NAME=Android Emulator
ANDROID_PLATFORM_VERSION=14
```

Copy and edit:
```bash
cp .env.example .env
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| `Unable to find device/emulator` | Run `adb devices` to verify emulator is online; increase boot wait time in scripts |
| `Appium doctor shows missing deps` | Re-run `npm run appium:driver:doctor` after installing Java/Android SDK |
| `Tests timeout on page load` | Increase `waitforTimeout` in `wdio/wdio.android.conf.js` (default: 15s) |
| `Chrome driver mismatch` | WDIO auto-downloads compatible chromedriver; check network access |
| `Emulator won't start` | Ensure 2GB+ RAM available; check Android Studio SDK path |

---

---

## CI / CD

### Playwright GitHub Actions

The project includes a ready-to-use Playwright workflow at `.github/workflows/playwright.yml`.

On every push/PR to `main`/`master`:
1. Dependencies installed via `npm ci`
2. Playwright browsers downloaded
3. Tests run in parallel across Chromium, Firefox, and WebKit
4. HTML report and Allure artifacts uploaded
5. History preserved between runs

### WebdriverIO Mobile GitHub Actions

Dedicated workflow for Android mobile tests at `.github/workflows/wdio-mobile-e2e.yml`.

On push/PR (configurable):
1. Sets up Node.js, Java, Android SDK
2. Creates Android Virtual Device (API 34)
3. Validates Appium setup
4. Boots emulator and runs all WDIO tests
5. Uploads test results as artifacts

**Note**: Mobile CI may be slower on shared runners; consider using self-hosted runners for consistent performance.

### Environment Variables for CI

Set these in GitHub repository settings → Secrets:

```
BASE_URL              # Override for Playwright (default: live site)
WDIO_BASE_URL         # Override for WebdriverIO
```

Or define in workflow file directly.

---

## Tech Stack

### Desktop (Playwright)

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation (Chrome, Firefox, Safari) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code |
| [dotenv](https://github.com/motdotla/dotenv) | Environment-based configuration |
| [Allure](https://allurereport.org/) | Rich test reporting with history trends |

### Mobile (WebdriverIO + Appium)

| Tool | Purpose |
|------|---------|
| [WebdriverIO](https://webdriver.io/) | Browser automation framework |
| [Appium](https://appium.io/) | Mobile device automation server |
| [UiAutomator2 Driver](https://github.com/appium/appium-uiautomator2-driver) | Android device driver |
| [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio) | Custom WebdriverIO matchers |
| JavaScript | Test code (no TypeScript in WDIO currently) |

### CI/CD

| Tool | Purpose |
|------|---------|
| [GitHub Actions](https://github.com/features/actions) | Continuous integration pipeline |
## Framework Comparison: Playwright vs WebdriverIO

| Aspect | Playwright | WebdriverIO + Appium |
|--------|-----------|---------------------|
| **Setup Time** | 2-3 min | 15-20 min (first time) |
| **Browsers** | Chrome, Firefox, Safari, mobile emulators | Native mobile apps + Chrome on Android/iOS |
| **Real Devices** | Virtual only | Yes, physical phones/tablets |
| **Speed** | Very fast (~2-5s per test) | Moderate (~5-15s per test) |
| **Headless Mode** | Yes, default | Emulator only (visual by nature) |
| **Best For** | Desktop workflows, rapid iteration | Mobile-specific behavior, real device testing |
| **When to Use** | Daily local testing, pre-commit checks | Mobile release cycles, device compatibility |

---

## Directory Architecture

```
Playwright/                          <- WDIO + Appium mobile tests integrated here
├── e2e/                            <- Playwright desktop tests
│   ├── pages/                       <- Playwright Page Objects (TypeScript)
│   ├── data/                        <- Test data (centralized)
│   └── *.spec.ts                    <- Test specs
├── wdio/                            <- WebdriverIO mobile tests (NEW)
│   ├── pageobjects/                 <- Mobile POMs (JavaScript)
│   ├── tests/                       <- Mobile specs
│   └── wdio.android.conf.js         <- Appium config
├── scripts/                         <- Convenience scripts
│   ├── run-wdio-mobile.sh          <- Boot emulator + test (Unix)
│   └── run-wdio-mobile.ps1         <- Boot emulator + test (Windows)
├── .github/workflows/               <- CI/CD pipelines
│   ├── playwright.yml               <- Desktop E2E (Playwright)
│   └── wdio-mobile-e2e.yml         <- Mobile E2E (WebdriverIO)
├── package.json                     <- All npm scripts
└── README.md                        <- This file
```

---

## Advanced Topics

### Running Specific Tests

**Playwright:**
```bash
npx playwright test e2e/homepage.spec.ts              # Single file
npx playwright test e2e/homepage.spec.ts -g "header"  # Grep specific test
```

**WebdriverIO:**
```bash
npx wdio run wdio/wdio.android.conf.js --spec wdio/tests/prelude.mobile.e2e.js
```

### Debugging

**Playwright UI Mode** (recommended):
```bash
npm run test:ui
```
- Step through tests visually
- Inspect DOM at each step
- View trace files

**Playwright Inspector:**
```bash
npm run test:debug
```

**WebdriverIO Debug Logs:**
```bash
npm run wdio:test:debug
```

### Custom Device Configuration

**Playwright** (edit `playwright.config.ts`):
```typescript
devices: [
  { ...devices['iPhone 14'] },
  { ...devices['Galaxy S21'] },
]
```

**WebdriverIO** (edit `wdio/wdio.android.conf.js`):
```javascript
'appium:udid': 'emulator-5554',           // Device ID or UUID
'appium:appPackage': 'com.android.chrome', // App package name
```

### Performance Optimization

- Use `--workers=1` in CI if tests are flaky (one at a time)
- Increase timeouts on slower networks: `waitforTimeout: 30000`
- Skip video/trace recording if storage is limited

---

## Support & Contributions

- **Issues**: Report bugs via GitHub Issues
- **Improvements**: Submit pull requests
- **Questions**: Check existing test files for patterns
- **Docs**: See [Playwright Docs](https://playwright.dev) and [Appium Docs](https://appium.io/docs/en/)

---

**Last Updated**: May 2026  
**Maintained by**: Prelude Electronics QA Team
