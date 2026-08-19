import { expect, test } from '@playwright/test';

test('client-side navigation avoids full page reload', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    (window as unknown as { __nostNavCount?: number }).__nostNavCount = 0;
    window.addEventListener('load', () => {
      (window as unknown as { __nostNavCount?: number }).__nostNavCount =
        ((window as unknown as { __nostNavCount?: number }).__nostNavCount ?? 0) + 1;
    });
  });

  await page.getByRole('link', { name: '/products/1' }).click();
  await expect(page).toHaveURL(/\/products\/1$/);
  await expect(page.getByRole('heading', { name: 'Product 1' })).toBeVisible();

  const loadCount = await page.evaluate(
    () => (window as unknown as { __nostNavCount?: number }).__nostNavCount ?? 0,
  );
  expect(loadCount).toBe(0);

  await page.getByRole('link', { name: '← Back to home' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: /Nest-first engine for Octane SSR/i })).toBeVisible();
});
