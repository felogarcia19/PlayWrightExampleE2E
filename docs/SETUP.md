# Environment Setup Guide 🛠️

## General Prerequisites

Before working with any of the test automation examples, ensure you have the following installed:

---

## 📦 System Requirements

### Node.js & npm

**Required Version:** Node.js v16 or higher

#### Installation

**macOS (using Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Windows:**
Download and install from [nodejs.org](https://nodejs.org/)

#### Verify Installation
```bash
node --version
npm --version
```

---

### Git

**Required for version control and cloning repositories**

#### Installation

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

**Windows:**
Download from [git-scm.com](https://git-scm.com/)

#### Verify Installation
```bash
git --version
```

---

## 🧪 Playwright-Specific Setup

### Installation
```bash
cd playwright-tests
npm install
npx playwright install
```

### Browsers Installation
```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

---

## 📊 K6-Specific Setup

### Installation

**macOS:**
```bash
brew install k6
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6-stable.list
sudo apt-get update
sudo apt-get install k6
```

**Windows:**
```bash
choco install k6
```

### Verify Installation
```bash
k6 version
```

---

## 🔬 API Testing Setup

### Installation
```bash
cd api-testing
npm install
```

### Environment Variables
Create a `.env` file:
```bash
BASE_URL=https://api.example.com
API_KEY=your_api_key
AUTH_TOKEN=your_token
```

---

## 🔧 IDE & Editor Setup (Recommended)

### Visual Studio Code

**Recommended Extensions:**
1. **Playwright Inspector** - Playwright debugging
2. **REST Client** - Send HTTP requests
3. **Thunder Client** - API testing
4. **GraphQL** - GraphQL syntax highlighting
5. **GitLens** - Git integration
6. **ESLint** - Code linting
7. **Prettier** - Code formatting

**Install Extensions:**
```bash
code --install-extension ms-playwright.playwright
code --install-extension humao.rest-client
code --install-extension rangav.vscode-thunder-client
```

---

## 📝 Clone the Repository

```bash
# Clone the repository
git clone https://github.com/felogarcia19/PlayWrightExampleE2E.git

# Navigate into the directory
cd PlayWrightExampleE2E

# View available folders
ls -la
```

---

## ✅ Verify Setup

### Check All Tools
```bash
echo "=== Node.js ==="
node --version
npm --version

echo "=== Git ==="
git --version

echo "=== K6 ==="
k6 version

echo "=== Playwright ==="
cd playwright-tests
npm list @playwright/test
```

---

## 🐛 Troubleshooting

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Port conflicts
If you encounter port errors, the tools usually auto-select alternate ports. Check logs for the assigned port.

### Permission errors (Linux/macOS)
```bash
# Fix npm permissions
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

---

## 🔗 Quick Links

- [Node.js Official](https://nodejs.org/)
- [Git Official](https://git-scm.com/)
- [Playwright Docs](https://playwright.dev/)
- [K6 Docs](https://k6.io/docs/)
- [VS Code](https://code.visualstudio.com/)

---

## 📞 Need Help?

Refer to individual documentation files:
- [Playwright Setup](./PLAYWRIGHT.md)
- [K6 Setup](./K6.md)
- [API Testing Setup](./API-TESTING.md)