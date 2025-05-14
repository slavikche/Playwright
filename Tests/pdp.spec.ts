import test, { expect, Locator } from "@playwright/test";

test.describe('PDP tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const userNameField = page.locator('input[data-test="username"]');
        const passwordField = page.locator('//input[@name="password"]');

        await userNameField.fill('standard_user');
        await passwordField.fill('secret_sauce');

        await page.locator('#login-button').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');
        const allItems = await page.locator('.inventory-item-name').all();
        if (allItems.length === 0) {
            throw new Error('No inventory items found!');
        }

        const randomIndex = Math.floor(Math.random() * allItems.length);
        console.log(`Opening item at index: ${randomIndex}`);
        await allItems[randomIndex].click();
    })
   
    test(('Verify UI - price, image, name, description are displayed'), async ({ page }) => {
        const productName = page.locator('[data-test="inventory-item-name"]');
        const productDescription = page.locator('[data-test="inventory-item-desc"]');
        const productPrice = page.locator('[data-test="inventory-item-price"]');
        const productImage = page.locator('[class="inventory_details_img"]');

        await expect(productName).toBeVisible();
        await expect(productDescription).toBeVisible();
        await expect(productPrice).toBeVisible();
        await expect(productImage).toBeVisible();

    })


    test(('Add product to cart'), async ({ page }) => {
        await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
        await page.getByTestId('add-to-cart').click();
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
    })

    test(('Remove product from cart'), async ({ page }) => {
        await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
        await page.getByTestId('add-to-cart').click();
        await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

        await page.getByTestId('remove').click();
        await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();

    })

    test(('Verify going back to Products page'), async ({ page }) => {
        await page.getByTestId('back-to-products').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByTestId('title')).toHaveText('Products');
    })

})





// import { test, expect } from "@playwright/test";

// test.describe('PDP tests', () => {

//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('[data-test="username"]').fill('standard_user');
//     await page.locator('[data-test="password"]').fill('secret_sauce');
//     await page.locator('[data-test="login-button"]').click();

//     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//     await expect(page.locator('.title')).toHaveText('Products');

//     const allItems = await page.locator('.inventory_item_name').all();
//     if (allItems.length === 0) {
//       throw new Error('No inventory items found!');
//     }

//     const randomIndex = Math.floor(Math.random() * allItems.length);
//     console.log(`Opening item at index: ${randomIndex}`);
//     await allItems[randomIndex].click();
//   });

//   test('Verify UI - price, image, name, description are displayed', async ({ page }) => {
//     await expect(page.locator('.inventory_details_name')).toBeVisible();
//     await expect(page.locator('.inventory_details_desc')).toBeVisible();
//     await expect(page.locator('.inventory_details_price')).toBeVisible();
//     await expect(page.locator('.inventory_details_img')).toBeVisible();
//   });

//   test('Add product to cart', async ({ page }) => {
//     const cartBadge = page.locator('.shopping_cart_badge');
//     await expect(cartBadge).not.toBeVisible();

//     await page.locator('button.btn_primary.btn_inventory').click(); // Add to cart
//     await expect(cartBadge).toHaveText('1');
//   });

//   test('Remove product from cart', async ({ page }) => {
//     const cartBadge = page.locator('.shopping_cart_badge');
//     await expect(cartBadge).not.toBeVisible();

//     await page.locator('button.btn_primary.btn_inventory').click(); // Add to cart
//     await expect(cartBadge).toHaveText('1');

//     await page.locator('button.btn_secondary.btn_inventory').click(); // Remove
//     await expect(cartBadge).not.toBeVisible();
//   });

//   test('Verify going back to Products page', async ({ page }) => {
//     await page.locator('[data-test="back-to-products"]').click();
//     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//     await expect(page.locator('.title')).toHaveText('Products');
//   });

// });