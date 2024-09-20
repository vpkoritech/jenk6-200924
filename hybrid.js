import { browser } from 'k6/browser';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 1,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
    news: {
      executor: 'constant-vus',
      exec: 'news',
      vus: 2,
      duration: '1m',
    },
  },
  thresholds: {
    browser_http_req_failed: ['rate<0.51'], // 95% of browser requests must complete below 2s
    browser_http_req_duration: ['p(90)<3500','p(95)<4000','p(99.9)<5000',], // 95% of requests must complete below 2s
    http_req_duration: ['p(90)<800','p(95)<1000','p(99.9)<2000',], // 95% of requests must complete below 2s
    http_req_failed: ['rate<0.01'], // 95% of requests must complete below 2s
    checks: ['rate==1.0'],
  },
};

export async function browserTest() {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');

    await page.locator('#checkbox1').check();

    const info = await page.locator('#checkbox-info-display').textContent();
    check(info, {
      'checkbox is checked': (info) => info === 'Thanks for checking the box',
    });
  } finally {
    await page.close();
  }
}

export function news() {
  const res = http.get('https://test.k6.io/news.php');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}