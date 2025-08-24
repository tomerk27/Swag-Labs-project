import { expect, test } from '@playwright/test'

export class generalPage
{
    constructor(page)
    {
        this.page = page
        this.optionsButton = page.getByRole('button', { name: 'Open Menu' })
        this.closeOptionsButton = page.getByRole('button', { name: 'Close Menu' })
        this.cartButton = page.locator('[data-test="shopping-cart-link"]')
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]')
    }

    async goToCart()
    {
        await this.cartButton.click()

        expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html')
    }

    async goToOptions()
    {
        await this.optionsButton.click()
        await expect(this.page.locator('[data-test="about-sidebar-link"]')).toBeVisible()
    }

    async closeOptions()
    {
        await this.closeOptionsButton.click()
        await expect(this.page.locator('[data-test="about-sidebar-link"]')).not.toBeVisible()
    }

    async logout()
    {
        await this.logoutButton.click()
        expect(this.page).toHaveURL('https://www.saucedemo.com/')
    }
}