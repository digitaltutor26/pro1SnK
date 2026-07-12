import { test, expect } from '@playwright/test';

test.describe('Tier 1: Feature Coverage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC1.1 - Hero Section layout', async ({ page }) => {
    await expect(page.getByTestId('hero-catchphrase')).toBeVisible();
    await expect(page.getByTestId('hero-cta')).toBeVisible();
  });

  test('TC1.2 - Services Section layout', async ({ page }) => {
    await expect(page.getByTestId('services-section')).toBeVisible();
  });

  test('TC1.3 - About Section layout', async ({ page }) => {
    await expect(page.getByTestId('about-section')).toBeVisible();
  });

  test('TC1.4 - Contact Form Fields visibility', async ({ page }) => {
    await expect(page.getByTestId('contact-name')).toBeVisible();
    await expect(page.getByTestId('contact-email')).toBeVisible();
    await expect(page.getByTestId('contact-message')).toBeVisible();
    await expect(page.getByTestId('contact-submit')).toBeVisible();
  });

  test('TC1.5 - Happy Path Contact Form submission', async ({ page }) => {
    // Fill Name, Email, and Message
    await page.getByTestId('contact-name').fill('John Doe');
    await page.getByTestId('contact-email').fill('john.doe@example.com');
    await page.getByTestId('contact-message').fill('Hello, this is a test message.');

    // Set a window variable to verify page doesn't reload
    await page.evaluate(() => {
      (window as any).__non_reload_marker = 'persisted';
    });

    // Submit
    await page.getByTestId('contact-submit').click();

    // Assert success feedback is shown
    await expect(page.getByTestId('success-feedback')).toBeVisible();

    // Assert page doesn't reload (window variable persists)
    const marker = await page.evaluate(() => (window as any).__non_reload_marker);
    expect(marker).toBe('persisted');

    // Assert fields are reset to empty
    await expect(page.getByTestId('contact-name')).toHaveValue('');
    await expect(page.getByTestId('contact-email')).toHaveValue('');
    await expect(page.getByTestId('contact-message')).toHaveValue('');
  });
});
