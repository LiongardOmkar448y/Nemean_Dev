const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const reportPath = path.join(__dirname, 'allure-report', 'index.html');
  const outputPDF = path.join(__dirname, 'allure-report', 'AllureReport.pdf');

  if (!fs.existsSync(reportPath)) {
    console.error('❌ Allure HTML report not found. Please run "npm run allure:generate" first.');
    process.exit(1);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPDF,
    format: 'A4',
    printBackground: true
  });

  console.log(`✅ PDF report generated at: ${outputPDF}`);
  await browser.close();
})();
