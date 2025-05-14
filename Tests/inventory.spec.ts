import test, { expect } from "@playwright/test";

test.describe('Inventory tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const userNameField = page.locator('input[data-test="username"]');
        const passwordField = page.locator('//input[@name="password"]');

        await userNameField.fill('standard_user');
        await passwordField.fill('secret_sauce');

        await page.locator('#login-button').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByTestId('title')).toHaveText('Products');
    })

    test('6 products are displayed by default', async ({ page }) => {
        const items = page.locator('.inventory_item');
        await expect(items).toHaveCount(6);
        expect(await items.count()).toBe(6);
    });

    test('UI - burger menu, filter and cart icon are displayed', async ({ page }) => {
        await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
        await expect(page.getByTestId('shopping-cart-link')).toBeVisible();
        await expect(page.getByTestId('product-sort-container')).toBeVisible();
    });

    test('Sorting - by price (from high to low)', async ({ page }) => {
        // Get initial prices
        let initialPrices;

        const pricesFromPage = await page.getByTestId('inventory-item-price').all();

        for (let i = 0; i < pricesFromPage.length; i++) {
            const priceWithoutFormatting = await pricesFromPage[i].textContent();
            const priceWithFormatting = priceWithoutFormatting!.split('$');
            const finalPrice = priceWithFormatting[1];
            initialPrices.push(finalPrice)
            // prices.push(await pricesFromPage[i].textContent())
        }
        console.log(initialPrices);
        // Make filtering on the page

        //Filter initial values

        //Make new prices

        //Verify new prices = filtered initial prices
    });

})