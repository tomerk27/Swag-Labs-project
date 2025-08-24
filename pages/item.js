import { expect, test } from '@playwright/test'
import { generalPage } from "./general"
import { menuPage } from "./menu"

export class itemPage extends generalPage
{
    constructor(page)
    {
        super(page)
        
        this.page = page
        this.addToCartButton = this.page.locator('[data-test="add-to-cart"]')
        this.removeFromCartButton = this.page.locator('[data-test="remove"]')
        this.backToProductsButton = this.page.locator('[data-test="back-to-products"]')
    }

    async goToPage()
    {
        const menu = new menuPage(this.page)
        await menu.goToPage()
        await menu.goToItemByItsTitle('Sauce Labs Backpack')
    }

    async addItemToCart()
    {
        await this.addToCartButton.click()
        await expect(this.removeFromCartButton).toBeVisible()
    }

    async removeFromCart()
    {
        await this.removeFromCartButton.click()
        await expect(this.addToCartButton).toBeVisible()
    }

    async backToProducts()
    {
        await this.backToProductsButton.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }
}