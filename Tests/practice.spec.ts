import { test, expect } from '@playwright/test';


test('checkboxes and radio buttons', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/checkboxes');


  await page.getByLabel(` Checkbox 2 `).scrollIntoViewIfNeeded();
  await page.getByLabel(` Checkbox 2 `).uncheck();
  await page.getByLabel(` Checkbox 1 `).check();
  await expect(page.getByLabel(` Checkbox 1 `)).toBeChecked();
  await expect(page.getByLabel(` Checkbox 2 `)).not.toBeChecked();

});


test('dropdown', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/dropdown');
  await page.locator('//*[@id="dropdown"]').selectOption('Option 1');
  await page.waitForTimeout(5000);

});



