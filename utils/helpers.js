// Wait for element to be visible
async function waitForElement(page, selector, timeout = 5000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}


function generateRandomEmail(domain = 'example.com') {
  const randomStr = Math.random().toString(36).substring(2, 11);
  return `user_${randomStr}@${domain}`;
}

// Delay function
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = {
  waitForElement,
  generateRandomEmail,
  delay
};
