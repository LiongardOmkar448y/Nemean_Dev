
# Allure Report Setup

To use Allure with Playwright:
1. Install Allure CLI and dependencies:
   ```bash
   npm i -D @playwright/test allure-playwright
   npm install -g allure-commandline --save-dev
   ```

2. Update `playwright.config.js` to include reporter config:
   ```js
   reporter: [['allure-playwright']],
   ```

3. Run tests with:
   ```bash
   npx playwright test
   ```

4. Generate report:
   ```bash
   allure generate allure-results --clean -o allure-report
   allure open allure-report
   ```
