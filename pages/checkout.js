import { test, expect } from '@playwright/test'
import { cartPage } from './cart'

export class checkoutPage
{
    constructor(page)
    {
        this.page = page
        this.firstNameInput = page.locator('[data-test="firstName"]')
        this.lastNameInput = page.locator('[data-test="lastName"]')
        this.zipCodeInput = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
        this.cancelButton = page.locator('[data-test="cancel"]')
    }

    async goToPage()
    {
        const cart = new cartPage(this.page)
        await cart.goToPage()
        await cart.checkout()

        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    }

    async fillField(firstName, lastName, zipCode)
    {
        if(firstName)
        {
            await this.firstNameInput.fill(firstName)
            expect(this.firstNameInput).toHaveValue(firstName)
        }
 
        if(lastName)
        {
            await this.lastNameInput.fill(lastName)
            await expect(this.lastNameInput).toHaveValue(lastName)
        }

        if(zipCode)
        {
            await this.zipCodeInput.fill(zipCode)
            await expect(this.zipCodeInput).toHaveValue(zipCode)
        }
    }

    async continue()
    {
        await this.continueButton.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    }

    async continueWhenFieldsNotFilled()
    {
        await this.continueButton.click()
        await expect(this.page.locator('[data-test="error-button"]')).toBeVisible()
    }
    async cancel()
    {
        await this.cancelButton.click()
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html')
    }
}