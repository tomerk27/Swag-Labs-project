import { menuPage } from "./menu"
import { test, expect } from '@playwright/test'

export class cartPage
{
    constructor(page)
    {
        this.page = page
        this.checkoutButton = page.locator('[data-test="checkout"]')
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]')
        this.items = page.locator('.cart_item')
    }

    async removeItemFromCart(itemName)
    {
        const item = await this.getItemByName(itemName)
        await item.locator('button', { hasText: 'Remove' }).click()
        
        const isItemRemoved = await this.getItemByName(itemName)
        expect(isItemRemoved).toBeFalsy()
    }

    async getItemByName(name)
    {
        const itemCount = await this.items.count()
        for(let i = 0; i < itemCount; i++)
        {
            const item = this.items.nth(i)

            const nameLocator = item.locator('.inventory_item_name')
            const itemName = await nameLocator.textContent()

            if(itemName === name)
                return item
        }
        return null
    }

    async goToPage()
    {
        const menu = new menuPage(this.page)
        await menu.goToPage()

        await menu.goToCart()
    }

    async continueShopping()
    {
        await this.continueShoppingButton.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async checkout()
    {
        await this.checkoutButton.click()

        expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    }
}