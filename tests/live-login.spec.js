import { test, expect } from '@playwright/test';

test('Ghost User: Can successfully log in and see the feed', async ({ page }) => {
  
  // 1. Go to your live Vercel app's login page
  await page.goto('https://re-life-app.vercel.app/login');

  // 2. Type in the email address
  // It looks for the input box where type="email"
  await page.fill('input[type="email"]', 'ahmed.ezzaroui@gmail.com');

  // 3. Type in the password
  // It looks for the input box where type="password"
  await page.fill('input[type="password"]', 'admin1234');

  // 4. Click the Login button
  // It looks for a button that has the exact text "Log In"
  await page.getByRole('button', { name: 'Log In' }).click();

  // 5. THE TEST: Did we get redirected to the feed?
  // We wait for the URL to change and prove the login worked!
  await expect(page).toHaveURL(/.*\/profile/);
  
});