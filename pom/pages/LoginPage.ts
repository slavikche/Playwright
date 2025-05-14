import { expect, Locator, Page } from "@playwright/test";

export default class LoginPage {
    private readonly page: Page;
    private readonly userNameField: Locator;
    private readonly userPasswordField: Locator;
    private readonly loginButton: Locator;
    private readonly logoutButton: Locator;
    readonly headerLogo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = page.locator('input[data-test="username"]');
        this.userPasswordField = page.locator('input[data-test="password"]');
        this.loginButton = page.locator('input[data-test="login-button"]');
        this.headerLogo = page.locator('//div[@class="login_logo"]').filter({hasText: 'Swag Labs'});;
    }

    async openPage() {
        await this.page.goto('/');
    }

    async validateLoginForm() {
        await expect (this.headerLogo).toBeVisible();
        await expect (this.userNameField).toBeVisible();
        await expect (this.userPasswordField).toBeVisible();
        await expect (this.loginButton).toBeVisible();
    }

    async enterUserName(username: string) {
        await this.userNameField.fill(username);
    }

    async enterUserPassword(password: string) {
        await this.userPasswordField.fill(password);
    }

    async ClickLoginButton() {
        await this.loginButton.click();
    }

    async ClickLogoutButton() {
        await this.logoutButton.click();
    }
    
    async loginWithCredentials(username: string, password: string) {
        await this.enterUserName(username);
        await this.enterUserPassword(password);
        await this.ClickLoginButton();

    }
}

