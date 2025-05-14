import { test, expect } from '@playwright/test';
import { users } from '../test-data/credentials';
import LoginPage from '../pom/pages/LoginPage';
import Header from '../pom/components/Header';
import InventoryPage from '../pom/pages/InventoryPage';

let loginPage: LoginPage;
let header: Header;
let inventoryPage: InventoryPage;

test.describe('Login tests with POM', () => {
    
    test.beforeEach(async ({ page }) => {
    
        await page.goto('/');
        loginPage = new LoginPage(page);
        header = new Header(page);
        inventoryPage = new InventoryPage(page);

});

    test ('Login form validation', async ({page}) => {

        await loginPage.validateLoginForm();
        
    })
    
    test('Successful login', async ({ page }) => {

        await loginPage.loginWithCredentials(users.valid.username, users.valid.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await inventoryPage.inventoryTitle();
        await header.ClickMenuButton();
        await page.click('//a[contains(text(), "Logout")]');
        await expect(page).toHaveURL('https://www.saucedemo.com/');

    });

    test('Log in without username', async ({ page }) => {
    
        await loginPage.enterUserPassword(users.valid.password);
        await loginPage.ClickLoginButton();
        await expect(page.locator('//*[@id="login_button_container"]//h3')).toContainText('Epic sadface: Username is required');
    
    });

    test('Log in without password', async ({ page }) => {

        await loginPage.enterUserName(users.valid.username);
        await loginPage.ClickLoginButton();
        await expect(page.locator('//*[@id="login_button_container"]//h3')).toContainText('Epic sadface: Password is required');
    
    });

    test('Log in with invalid username/password', async ({ page }) => {

        await loginPage.loginWithCredentials('wrongname', users.valid.password);
        await expect(page.locator('//*[@id="login_button_container"]//h3')).toContainText('Epic sadface: Username and password do not match any user in this service');

    });

    test('Log in with locked user', async ({ page }) => {

        await loginPage.loginWithCredentials(users.locked.username, users.valid.password);
        await expect(page.locator('//*[@id="login_button_container"]//h3')).toContainText('Epic sadface: Sorry, this user has been locked out.');

    });

});
