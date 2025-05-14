import { expect, Locator, Page } from "@playwright/test";

export default class Header {
    readonly page: Page;
    readonly loginLogo: Locator;
    readonly headerLogo: Locator;
    readonly menuButton: Locator;
    readonly cartButton: Locator;
    readonly cartBadge: Locator;

    constructor (page: Page) {
        this.page = page;
        this.headerLogo = page.locator('//div[@class="app_logo"]');
        this.menuButton = page.locator('//button[@id="react-burger-menu-btn"]');
        this.cartButton = page.locator('//a[@class="shopping_cart_link"]');
        this.cartBadge = page.locator('.shopping_cart_badge');

    }

    validateHeaderLayout = async () => {
        await expect (this.headerLogo).toHaveText('Swag Labs');
        await expect (this.menuButton).toBeVisible();
        await expect (this.cartButton).toBeVisible();
    }

    async ClickMenuButton() {
        await this.menuButton.click();
    }

    async ClickCartButton() {
        await this.cartButton.click();
    }
    
    async emptyCart() {
        await expect(this.cartBadge).not.toBeVisible();
    }

    async Cart() {
        await expect(this.cartBadge).not.toBeVisible();
    }

    async CartBadgeCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toHaveText(`${count}`);
    }
    }
  

}