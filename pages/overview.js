import { expect, test } from '@playwright/test'
import { checkoutPage } from './checkout'

export class overviewPage
{
    constructor(page)
    {
        this.page = page
        this.finishButton = page.locator('[data-test="finish"]')
        this.cancelButton = page.locator('[data-test="cancel"]')
    }

    async goToPage()
    {
        const checkout = new checkoutPage(this.page)
        await checkout.goToPage()
        await checkout.fillField('tomer', 'kaplan', '123')
        await checkout.continue()
    }

    async cancel()
    {
        await this.cancelButton.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async finish()
    {
        await this.finishButton.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')

        await this.page.locator('[data-test="back-to-products"]').click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }
}