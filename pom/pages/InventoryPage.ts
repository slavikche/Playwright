import { expect, Locator, Page } from "@playwright/test";

export default class InventoryPage {
    readonly page: Page;
    readonly productNames: Locator;
    readonly pageTitle: Locator;

    constructor (page: Page) {
        this.page = page;
        this.productNames = page.locator('.inventory_item_name');
        this.pageTitle = page.locator('span[data-test="title"]').filter({hasText: 'Products'});
    }

    async checkItems() {
        await expect(this.productNames).toBeVisible();
    }
    
    async inventoryTitle() {
        await expect(this.pageTitle).toBeVisible();
    }

    async openRandomProduct() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        const allItems = await this.productNames.all();
        if (allItems.length === 0) {
        throw new Error('No inventory items found!');
        }
        const randomIndex = Math.floor(Math.random() * allItems.length);
        console.log(`Opening item at index: ${randomIndex}`);
        await allItems[randomIndex].click();
    }

}