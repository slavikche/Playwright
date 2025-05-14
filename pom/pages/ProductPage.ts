import { expect, Locator, Page } from "@playwright/test";

export default class ProductPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly productAddToCart: Locator;
    readonly productRemoveFromCart: Locator;
    readonly backButton: Locator;
    readonly title: Locator;

    constructor (page: Page) {
        this.page = page;
        this.productName = page.locator('.inventory_details_name');
        this.productDescription = page.locator('.inventory_details_desc');
        this.productPrice = page.locator('.inventory_details_price');
        this.productImage = page.locator('.inventory_details_img');
        this.productAddToCart = page.locator('button.btn_primary.btn_inventory');
        this.productRemoveFromCart = page.locator('button.btn_secondary.btn_inventory');
        this.backButton = page.locator('[data-test="back-to-products"]');
        this.title = page.locator('.title');

    }

    async validateProductPageElements() {
        await expect(this.productName).toBeVisible();
        await expect(this.productDescription).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productImage).toBeVisible();
    }

    async addToCart() {
        await this.productAddToCart.click();
    }

    async removeFromCart() {
        await this.productRemoveFromCart.click();
    }

    async backToInventory() {
        await this.backButton.click();
    }

    async goBackToProductList() {
        await this.backButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(this.title).toHaveText('Products');
    }

}