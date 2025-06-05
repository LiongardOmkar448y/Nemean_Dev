
# Advanced Concepts for Future Enhancements

## ✅ 1. Environment Configuration
Use `.env` files to manage sensitive data securely.
```bash
npm install dotenv
```
In `config/config.js`:
```js
require('dotenv').config();

module.exports = {
  baseURL: process.env.BASE_URL,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};
```
Create a `.env` file:
```
BASE_URL=https://nemean.appdev.liongard.com
USERNAME=your_username_here
PASSWORD=omkar@34456
```

---

## ✅ 2. Page Object Model (POM) Best Practices
- Use getter methods for elements.
- Use async methods for actions.

---

## ✅ 3. Parallel Test Execution
Playwright supports parallel execution natively via the `workers` setting in `playwright.config.js`.

---

## ✅ 4. Tagging & Filtering Tests
Use `@tag` to categorize and run specific tests.
```bash
npx playwright test --grep @smoke
```

---

## ✅ 5. Custom Commands/Utils
Create reusable utility functions in the `utils/` folder, e.g. waitForElement, generateRandomEmail, etc.

---

## ✅ 6. Reporting with Allure
Enhanced test reports with screenshots, logs, and video.

---

## ✅ 7. GitHub Actions for CI/CD
Automate tests using GitHub Actions:
```yaml
name: Playwright Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install
      - run: npx playwright test
```

---

## ✅ 8. Dockerize Tests
Run Playwright tests in isolated environments using Docker.
```Dockerfile
FROM mcr.microsoft.com/playwright:v1.42.1
WORKDIR /app
COPY . .
RUN npm install
CMD ["npx", "playwright", "test"]
```

---

## ✅ 9. Test Data Management
Use JSON files for test data, stored in `test-data/` folder.

---

## ✅ 10. Advanced Assertions and Waits
Use `expect.poll()` and custom conditions for flaky element handling.

---

## ✅ 11. Video & Trace Viewer
Enable video and trace in `playwright.config.js` for better debugging.

---

## ✅ 12. BrowserStack or SauceLabs Integration
Run cross-browser tests on real devices.

---

## ✅ 13. Retry Failed Tests
Configure `retries` in `playwright.config.js`.

---

## ✅ 14. Test Coverage & Metrics
Integrate with tools like `nyc` or use code instrumentation.

---

## ✅ 15. Email/Slack Notification Integration
Notify the team after test completion via Slack/Email APIs.

---

> Add features incrementally and keep the framework modular and DRY (Don't Repeat Yourself).


# 🚀 Playwright Automation Framework – Liongard Project

This repository contains an end-to-end automation framework built using [Playwright](https://playwright.dev/).  
It follows the **Page Object Model (POM)** design pattern and supports **Allure reporting**, **test tagging**, and **CI/CD readiness**.

---

## 📦 Prerequisites

Ensure the following tools are installed on your machine:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Git](https://git-scm.com/)
- VS Code (optional but recommended)

---

## 📁 Project Structure Overview

