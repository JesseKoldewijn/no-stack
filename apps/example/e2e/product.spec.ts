import { expect, test } from '@playwright/test';

test('product page renders styled card and likes button hydrates', async ({ page }) => {
  await page.goto('/products/1');

  await expect(page.getByRole('heading', { name: 'Product 1' })).toBeVisible();
  await expect(page.getByText('Price: $202')).toBeVisible();

  const likesButton = page.getByRole('button', { name: 'Likes: 0' });
  await likesButton.click();
  await expect(page.getByRole('button', { name: 'Likes: 1' })).toBeVisible();
});

test('product page back link returns home', async ({ page }) => {
  await page.goto('/products/1');
  await page.getByRole('link', { name: '← Back to home' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: /Nest-first engine for Octane SSR/i })).toBeVisible();
});
