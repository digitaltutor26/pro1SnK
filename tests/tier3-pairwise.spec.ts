import { test, expect } from '@playwright/test';

test.describe('Tier 3: Pairwise Combinatorial Input Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC3.1: Name Valid, Email Invalid, Message Empty -> Email & Message errors', async ({ page }) => {
    await page.getByTestId('contact-name').fill('John Doe');
    await page.getByTestId('contact-email').fill('invalid-email');
    await page.getByTestId('contact-message').fill('');
    await page.getByTestId('contact-submit').click();

    await expect(page.getByTestId('error-message').filter({ hasText: /email/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /message/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /name/i })).not.toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });

  test('TC3.2: Name Empty, Email Valid, Message Empty -> Name & Message errors', async ({ page }) => {
    await page.getByTestId('contact-name').fill('');
    await page.getByTestId('contact-email').fill('john@example.com');
    await page.getByTestId('contact-message').fill('');
    await page.getByTestId('contact-submit').click();

    await expect(page.getByTestId('error-message').filter({ hasText: /name/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /message/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /email/i })).not.toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });

  test('TC3.3: Name Empty, Email Invalid, Message Valid -> Name & Email errors', async ({ page }) => {
    await page.getByTestId('contact-name').fill('');
    await page.getByTestId('contact-email').fill('invalid-email');
    await page.getByTestId('contact-message').fill('Hello, this is a valid message.');
    await page.getByTestId('contact-submit').click();

    await expect(page.getByTestId('error-message').filter({ hasText: /name/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /email/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /message/i })).not.toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });

  test('TC3.4: Name Valid, Email Empty, Message Valid -> Email error', async ({ page }) => {
    await page.getByTestId('contact-name').fill('John Doe');
    await page.getByTestId('contact-email').fill('');
    await page.getByTestId('contact-message').fill('Hello, this is a valid message.');
    await page.getByTestId('contact-submit').click();

    await expect(page.getByTestId('error-message').filter({ hasText: /email/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /name/i })).not.toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /message/i })).not.toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });

  test('TC3.5: Name Empty, Email Empty, Message Valid -> Name & Email errors', async ({ page }) => {
    await page.getByTestId('contact-name').fill('');
    await page.getByTestId('contact-email').fill('');
    await page.getByTestId('contact-message').fill('Hello, this is a valid message.');
    await page.getByTestId('contact-submit').click();

    await expect(page.getByTestId('error-message').filter({ hasText: /name/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /email/i }).first()).toBeVisible();
    await expect(page.getByTestId('error-message').filter({ hasText: /message/i })).not.toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });
});
