import { check } from 'k6';
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    const header = await page.locator('h2').textContent();
    check(header, {
      header: (h) => h == 'Welcome, admin!',
    });
  } finally {
    await page.close();
  }
}