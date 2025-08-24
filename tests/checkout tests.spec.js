import { expect, test } from '@playwright/test'
import { checkoutPage } from '../pages/checkout'

test('fill fields', async  ({ page }) => {
    const checkout = new checkoutPage(page)
    await checkout.goToPage()

    await checkout.fillField('tomer', 'kaplan', '123')
});

test('back to cart', async ({ page }) => {
    const checkout = new checkoutPage(page)
    await checkout.goToPage()
    await checkout.cancel()
});

test('go to overview', async ({ page }) => {
    const checkout = new checkoutPage(page)
    await checkout.goToPage()
    await checkout.fillField('tomer', 'kaplan', '123')
    await checkout.continue()
});