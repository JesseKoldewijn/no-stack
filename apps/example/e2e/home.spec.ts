import { expect, test } from '@playwright/test';

test('home page renders styled layout and theme toggle works', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Nest-first engine for Octane SSR/i })).toBeVisible();

  const fontFamily = await page.getByRole('heading', { level: 1 }).evaluate((el) => {
    return getComputedStyle(el).fontFamily;
  });
  expect(fontFamily).not.toMatch(/Times/i);

  const root = page.locator('html');
  const hadDark = await root.evaluate((el) => el.classList.contains('dark'));

  await page.getByRole('button', { name: 'Toggle theme' }).click();

  const isDarkAfter = await root.evaluate((el) => el.classList.contains('dark'));
  expect(isDarkAfter).toBe(!hadDark);
});

test('home page links to product demo route', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '/products/1' }).click();
  await expect(page).toHaveURL(/\/products\/1$/);
  await expect(page.getByRole('heading', { name: 'Product 1' })).toBeVisible();
});
