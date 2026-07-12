import { test, expect } from '@playwright/test';

test.describe('Tier 4: Workload & Journey Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC4.1 - CTA Scroll Flow', async ({ page }) => {
    // Click Hero CTA button
    await page.getByTestId('hero-cta').click();

    // Verify Contact Form field is in the viewport
    await expect(page.getByTestId('contact-name')).toBeInViewport();
  });

  test('TC4.2 - Multi-step Correction Flow', async ({ page }) => {
    // Fill Name and Message, leave Email blank
    await page.getByTestId('contact-name').fill('Jane Doe');
    await page.getByTestId('contact-message').fill('Checking correction flow.');
    await page.getByTestId('contact-submit').click();

    // Assert Email error is shown, and success feedback is not shown
    await expect(page.getByTestId('error-message').filter({ hasText: /email/i }).first()).toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();

    // Fill invalid email
    await page.getByTestId('contact-email').fill('jane.doe@invalid');
    await page.getByTestId('contact-submit').click();

    // Assert Email error is still shown, no success
    await expect(page.getByTestId('error-message').filter({ hasText: /email/i }).first()).toBeVisible();
    await expect(page.getByTestId('success-feedback')).not.toBeVisible();

    // Correct the email
    await page.getByTestId('contact-email').fill('jane.doe@example.com');
    await page.getByTestId('contact-submit').click();

    // Assert success feedback is shown and inputs are reset to empty
    await expect(page.getByTestId('success-feedback')).toBeVisible();
    await expect(page.getByTestId('contact-name')).toHaveValue('');
    await expect(page.getByTestId('contact-email')).toHaveValue('');
    await expect(page.getByTestId('contact-message')).toHaveValue('');
  });

  test('TC4.3 - Responsive Layout Checks', async ({ page }) => {
    // Mobile config (375px viewport)
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Check visibility of sections
    await expect(page.getByTestId('hero-catchphrase')).toBeVisible();
    await expect(page.getByTestId('services-section')).toBeVisible();
    await expect(page.getByTestId('about-section')).toBeVisible();
    await expect(page.getByTestId('contact-name')).toBeVisible();

    // Submit form in mobile config
    await page.getByTestId('contact-name').fill('Mobile User');
    await page.getByTestId('contact-email').fill('mobile@example.com');
    await page.getByTestId('contact-message').fill('Testing mobile submission.');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('success-feedback')).toBeVisible();

    // Desktop config (1200px viewport)
    // Reload/reset to clear success state
    await page.goto('/');
    await page.setViewportSize({ width: 1200, height: 800 });

    // Check visibility of sections
    await expect(page.getByTestId('hero-catchphrase')).toBeVisible();
    await expect(page.getByTestId('services-section')).toBeVisible();
    await expect(page.getByTestId('about-section')).toBeVisible();
    await expect(page.getByTestId('contact-name')).toBeVisible();

    // Submit form in desktop config
    await page.getByTestId('contact-name').fill('Desktop User');
    await page.getByTestId('contact-email').fill('desktop@example.com');
    await page.getByTestId('contact-message').fill('Testing desktop submission.');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('success-feedback')).toBeVisible();
  });

  test('TC4.4 - Input Preservation on Resize', async ({ page }) => {
    // Set Mobile Viewport
    await page.setViewportSize({ width: 375, height: 812 });

    // Fill form fields
    const testName = 'Resized User';
    const testEmail = 'resize@example.com';
    const testMessage = 'Preserve my inputs please.';

    await page.getByTestId('contact-name').fill(testName);
    await page.getByTestId('contact-email').fill(testEmail);
    await page.getByTestId('contact-message').fill(testMessage);

    // Resize viewport to 1200px
    await page.setViewportSize({ width: 1200, height: 800 });

    // Assert values are preserved
    await expect(page.getByTestId('contact-name')).toHaveValue(testName);
    await expect(page.getByTestId('contact-email')).toHaveValue(testEmail);
    await expect(page.getByTestId('contact-message')).toHaveValue(testMessage);

    // Submit form and assert success
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('success-feedback')).toBeVisible();
  });
});
