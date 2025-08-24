import { expect, test } from '@playwright/test'

export class loginPage
{
    constructor(page)
    {
        this.page = page
        this.usernameInput = page.locator('[data-test="username"]')
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
        this.errorMassageLocator = page.locator('[data-test="error"]')
        this.errorMassage = ""
        this.errorButton = page.locator('[data-test="error-button"]')
    }

    async login(username, password, valid = true)
    {
        if (username)
        {
            await this.usernameInput.fill(username)
        }
        
        if (password)
        {
            await this.passwordInput.fill(password)
        }

        await this.loginButton.click()

        if (valid)
        {
            await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
        }
        else
        {
            await expect(this.errorButton).toBeVisible()
        }
    }

    async goToPage()
    {
        await this.page.goto('https://www.saucedemo.com/')
        await expect(this.page).toHaveURL('https://www.saucedemo.com/')
    }
}