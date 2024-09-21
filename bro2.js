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

    // Enter login credentials
    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    await page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    await page.close();
  }
}