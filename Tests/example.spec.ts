//import { test, expect } from '@playwright/test';

/*
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });
*/


/*
//Lesson 14
test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userNameField = page.locator('input[data-test="username"]');
  const passwordField = page.locator('//input[@name="password"]');
  const loginButton = page.locator('input[name="login-button"]');
  
  await userNameField.fill('test_user');
  await passwordField.fill('testpassword');

  await page.locator('#login-button').click();
  //await expect(page).toHaveURL('https://www.saucedemo.com/')

  //const element = page.locator('div', {has: page.locator('input[data-test="username"')});
  
  //const loginButton = page.getByTestId('input[name="login-button"]');
  //const loginButton = page.getByLabel('Login').click

  await expect(userNameField,).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(loginButton).toBeVisible();

});

test ('checkbox check and uncheck', async ({page}) => {
  await page.goto('https://practice.expandtesting.com/checkboxes');
  
  await page.getByLabel('Checkbox 2').uncheck();
  await page.getByLabel('Checkbox 2').check();

});
*/