import { test, expect } from '@playwright/test';

test.describe('Tier 2: Boundary & Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC2.1 - Empty Form Submission shows error messages', async ({ page }) => {
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('error-message').first()).toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });

  test('TC2.2 - Missing Name Field shows Name error, no success', async ({ page }) => {
    await page.getByTestId('contact-email').fill('test@example.com');
    await page.getByTestId('contact-message').fill('Hello world');
    await page.getByTestId('contact-submit').click();
    
    await expect(page.getByTestId('error-message').filter({ hasText: /name/i }).first()).toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });

  test('TC2.3 - Missing Message Field shows Message error, no success', async ({ page }) => {
    await page.getByTestId('contact-name').fill('John Doe');
    await page.getByTestId('contact-email').fill('test@example.com');
    await page.getByTestId('contact-submit').click();

    await expect(page.getByTestId('error-message').filter({ hasText: /message/i }).first()).toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });

  test('TC2.4 - Invalid Email Formats show Email error, no success', async ({ page }) => {
    const invalidEmails = ['test', 'test@', '@example.com'];
    
    for (const email of invalidEmails) {
      await page.goto('/');
      await page.getByTestId('contact-name').fill('John Doe');
      await page.getByTestId('contact-message').fill('Hello world');
      await page.getByTestId('contact-email').fill(email);
      await page.getByTestId('contact-submit').click();

      await expect(page.getByTestId('error-message').filter({ hasText: /email/i }).first()).toBeVisible();
      await expect(page.getByTestId('success-feedback')).not.toBeVisible();
    }
  });

  test('TC2.5 - Extremely Long Inputs submit successfully', async ({ page }) => {
    const longName = 'A'.repeat(100);
    const longEmail = 'a'.repeat(88) + '@example.com';
    const longMessage = 'M'.repeat(1000);

    await page.getByTestId('contact-name').fill(longName);
    await page.getByTestId('contact-email').fill(longEmail);
    await page.getByTestId('contact-message').fill(longMessage);
    await page.getByTestId('contact-submit').click();

    await expect(page.getByTestId('success-feedback')).toBeVisible();
    await expect(page.getByTestId('error-message')).not.toBeVisible();
    
    // Check fields are reset
    await expect(page.getByTestId('contact-name')).toHaveValue('');
    await expect(page.getByTestId('contact-email')).toHaveValue('');
    await expect(page.getByTestId('contact-message')).toHaveValue('');
  });

  test('TC2.6 - Modifying inputs after successful submission hides success feedback', async ({ page }) => {
    // 1. Submit successfully first
    await page.getByTestId('contact-name').fill('John Doe');
    await page.getByTestId('contact-email').fill('john@example.com');
    await page.getByTestId('contact-message').fill('Hello world');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('success-feedback')).toBeVisible();

    // 2. Modify name field, success feedback should be hidden
    await page.getByTestId('contact-name').fill('A');
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();

    // 3. Submit successfully again
    await page.getByTestId('contact-email').fill('john@example.com');
    await page.getByTestId('contact-message').fill('Hello world');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('success-feedback')).toBeVisible();

    // 4. Modify email field, success feedback should be hidden
    await page.getByTestId('contact-email').fill('b');
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();

    // 5. Submit successfully again
    await page.getByTestId('contact-name').fill('John Doe');
    await page.getByTestId('contact-email').fill('john@example.com');
    await page.getByTestId('contact-message').fill('Hello world');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('success-feedback')).toBeVisible();

    // 6. Modify message field, success feedback should be hidden
    await page.getByTestId('contact-message').fill('c');
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();
  });

  test('TC2.7 - Inputs and containers have correct accessibility attributes and roles', async ({ page }) => {
    // 1. Initially, aria-invalid should be false
    await expect(page.getByTestId('contact-name')).toHaveAttribute('aria-invalid', 'false');
    await expect(page.getByTestId('contact-email')).toHaveAttribute('aria-invalid', 'false');
    await expect(page.getByTestId('contact-message')).toHaveAttribute('aria-invalid', 'false');

    // 2. Trigger validation errors
    await page.getByTestId('contact-submit').click();

    // 3. Verify aria-invalid is true on elements with errors
    await expect(page.getByTestId('contact-name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByTestId('contact-email')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByTestId('contact-message')).toHaveAttribute('aria-invalid', 'true');

    // 4. Verify role="alert" and aria-live="assertive" on error messages container
    const errorContainer = page.locator('div[role="alert"]:not(#__next-route-announcer__)');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toHaveAttribute('aria-live', 'assertive');

    // 5. Fill form and submit successfully
    await page.getByTestId('contact-name').fill('Accessibility User');
    await page.getByTestId('contact-email').fill('access@example.com');
    await page.getByTestId('contact-message').fill('Valid accessibility check.');
    await page.getByTestId('contact-submit').click();

    // 6. Verify role="status" and aria-live="polite" on success feedback
    const successFeedback = page.getByTestId('success-feedback');
    await expect(successFeedback).toBeVisible();
    await expect(successFeedback).toHaveAttribute('role', 'status');
    await expect(successFeedback).toHaveAttribute('aria-live', 'polite');
  });

  test('TC2.8 - Accessibility linking and dynamic resetting of aria-invalid', async ({ page }) => {
    // 1. Submit empty form to trigger validation errors
    await page.getByTestId('contact-submit').click();

    // 2. Verify aria-describedby points to the correct error elements
    await expect(page.getByTestId('contact-name')).toHaveAttribute('aria-describedby', 'name-error');
    await expect(page.getByTestId('contact-email')).toHaveAttribute('aria-describedby', 'email-error');
    await expect(page.getByTestId('contact-message')).toHaveAttribute('aria-describedby', 'message-error');
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#message-error')).toBeVisible();

    // 3. Type in Name field and verify it clears name error and resets aria-invalid/aria-describedby
    await page.getByTestId('contact-name').fill('J');
    await expect(page.getByTestId('contact-name')).toHaveAttribute('aria-invalid', 'false');
    await expect(page.getByTestId('contact-name')).not.toHaveAttribute('aria-describedby', 'name-error');
    await expect(page.locator('#name-error')).not.toBeVisible();

    // 4. Type in Email field and verify it clears email error and resets aria-invalid/aria-describedby
    await page.getByTestId('contact-email').fill('j');
    await expect(page.getByTestId('contact-email')).toHaveAttribute('aria-invalid', 'false');
    await expect(page.getByTestId('contact-email')).not.toHaveAttribute('aria-describedby', 'email-error');
    await expect(page.locator('#email-error')).not.toBeVisible();

    // 5. Type in Message field and verify it clears message error and resets aria-invalid/aria-describedby
    await page.getByTestId('contact-message').fill('H');
    await expect(page.getByTestId('contact-message')).toHaveAttribute('aria-invalid', 'false');
    await expect(page.getByTestId('contact-message')).not.toHaveAttribute('aria-describedby', 'message-error');
    await expect(page.locator('#message-error')).not.toBeVisible();
  });
});

