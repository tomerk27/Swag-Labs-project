import { test, expect } from '@playwright/test'
import { menuPage } from "../pages/menu";
import { loginPage } from '../pages/login'

test( 'add item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    const menu = new menuPage(page)

    await menu.goToPage(expect)

    await menu.addItemToCart('Sauce Labs Backpack')
    await menu.removeItemFromCart('Sauce Labs Backpack')
});

test('go to item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    const login = new loginPage(page)
    await login.login()

    const menu = new menuPage(page)
    await menu.goToItemByItsTitle('Sauce Labs Backpack')
});

test('sort items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    const login = new loginPage(page)
    await login.login()

    const menu = new menuPage(page)
    await menu.sortBy(3)
});
