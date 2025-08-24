import { test, expect } from '@playwright/test'
import { loginPage } from '../pages/login'

test ( "valid login", async ({ page }) => {
    const login = new loginPage(page)
    await login.goToPage()
    await login.login()

    expect(login.errorMassage).toBeFalsy()
});