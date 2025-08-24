import { cartPage } from '../pages/cart'
import { menuPage } from '../pages/menu'
import { expect, test } from '@playwright/test'

test('remove item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    const menu = new menuPage(page)
    await menu.goToPage(expect)
    await menu.addItemToCart('Sauce Labs Fleece Jacket')
    await menu.goToCart(expect)

    const cart = new cartPage(page)
    await cart.removeItemFromCart('Sauce Labs Fleece Jacket')
});

test('continue shopping', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    const cart = new cartPage(page)
    await cart.goToPage()

    await cart.continueShopping()
});

test('checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    const cart = new cartPage(page)
    await cart.goToPage()

    await cart.checkout()
});