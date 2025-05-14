import { test, expect } from "@playwright/test";
import LoginPage from "../pom/pages/LoginPage";
import { users } from "../test-data/credentials";
import ProductPage from "../pom/pages/ProductPage";
import InventoryPage from "../pom/pages/InventoryPage";
import Header from "../pom/components/Header";

test.describe('PDP tests', () => {
  
  let loginPage: LoginPage;
  let header: Header;
  let productPage: ProductPage;
  let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
   
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    inventoryPage = new InventoryPage(page);
    header = new Header(page);
    
    await loginPage.openPage();
    await loginPage.loginWithCredentials(users.valid.username, users.valid.password);
    await inventoryPage.inventoryTitle();
    await inventoryPage.openRandomProduct();

  });

  test('Verify UI - price, image, name, description are displayed', async () => {
    
    await productPage.validateProductPageElements();

  });

  test('Add product to cart', async () => {

    await header.CartBadgeCount(0);
    await productPage.addToCart();
    await header.CartBadgeCount(1);

  });

  test('Remove product from cart', async () => {

    await header.CartBadgeCount(0);
    await productPage.addToCart();
    await header.CartBadgeCount(1);
    await productPage.removeFromCart();
    await header.CartBadgeCount(0);
    
  });

  test('Verify going back to Products page', async () => {
   
    await productPage.goBackToProductList();

  });

});