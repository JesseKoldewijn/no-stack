import { expect, test } from '@playwright/test';

test('stylesheet loads and applies Tailwind styles', async ({ page }) => {
  const cssResponse = await page.request.get('/assets/hydrate.css');
  expect(cssResponse.ok()).toBeTruthy();
  expect(cssResponse.headers()['content-type']).toMatch(/text\/css/);
  expect(await cssResponse.text()).toContain('min-h-screen');

  await page.goto('/');
  const fontFamily = await page.getByRole('heading', { level: 1 }).evaluate((el) => {
    return getComputedStyle(el).fontFamily;
  });
  expect(fontFamily).not.toMatch(/Times/i);
});

test('hydrate.js is served for client bootstrap', async ({ page }) => {
  const jsResponse = await page.request.get('/assets/hydrate.js');
  expect(jsResponse.ok()).toBeTruthy();
  expect(jsResponse.headers()['content-type']).toMatch(/javascript/);
});
