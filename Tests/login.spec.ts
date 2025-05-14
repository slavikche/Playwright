import { test, expect } from '@playwright/test';
import { users } from '../test-data/credentials';


test.describe('Login Page Tests', () => {

    test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
});2

    test('Login page and Login form validation', async ({ page }) => {
    
        
        const title = page.locator('//div[@class="login_logo"]');
        await expect(title).toContainText('Swag Labs');

        const userName = page.locator('input[data-test="username"]');
        const userPassword = page.locator('input[data-test="password"]');
        const loginButton = page.locator('input[data-test="login-button"]');

        await expect(userName).toBeVisible();
        await expect(userPassword).toBeVisible();
        await expect(loginButton).toBeVisible();

    });

    test('Log in without username', async ({ page }) => {
    
        await page.fill('input[data-test="password"]', users.valid.password);
        await page.click('input[data-test="login-button"]');

        const errorUsername = await page.locator('//*[@id="login_button_container"]//h3');
        await expect(errorUsername).toContainText('Epic sadface: Username is required');
    
    });

    test('Log in without password', async ({ page }) => {

        await page.fill('input[data-test="username"]', users.valid.username);
        await page.click('input[data-test="login-button"]');

        const errorPassword = await page.locator('//*[@id="login_button_container"]//h3');
        await expect(errorPassword).toContainText('Epic sadface: Password is required');
    
    });

    test('Log in with invalid username/password', async ({ page }) => {
    
        await page.fill('input[data-test="username"]', 'test');
        await page.fill('input[data-test="password"]', users.valid.password);
        await page.click('input[data-test="login-button"]');

        const invalidUsernamePassword = await page.locator('//*[@id="login_button_container"]//h3');
        await expect(invalidUsernamePassword).toContainText('Epic sadface: Username and password do not match any user in this service');

    });

    test('Log in with locked user', async ({ page }) => {

        await page.fill('input[data-test="username"]', users.locked.username), { delay: 150 };
        await page.fill('input[data-test="password"]', users.locked.password);
        await page.click('input[data-test="login-button"]');

        const errorLocked = page.locator('//*[@id="login_button_container"]//h3');
        await expect(errorLocked).toContainText('Epic sadface: Sorry, this user has been locked out.');

    });

    test('Log in with valid user', async ({ page }) => {

        await page.fill('input[data-test="username"]', users.valid.username), { delay: 150 };
        await page.fill('input[data-test="password"]', users.valid.password);
        await page.click('input[data-test="login-button"]');

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        const pageTitle = page.locator('span[data-test="title"]');

        await expect(pageTitle).toContainText('Products');
        await page.click('//button[@id="react-burger-menu-btn"]');
        await page.click('//a[contains(text(), "Logout")]');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

    });

});
