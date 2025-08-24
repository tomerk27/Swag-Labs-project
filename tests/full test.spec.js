import { test } from "@playwright/test";
import { loginPage } from '../pages/login'
import { menuPage } from '../pages/menu'
import { cartPage } from '../pages/cart'
import { checkoutPage} from '../pages/checkout'
import { overviewPage } from '../pages/overview'
import { itemPage } from '../pages/item'
import { loginDetails } from "../utils/login page details";
import { faker } from "@faker-js/faker";

test.describe('full test branches', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')

        const detailsForLogin = new loginDetails()

        const login = new loginPage(page)
        await login.login(detailsForLogin.username, detailsForLogin.password)
    });
    const testData = {
        partNumber : 'Sauce Labs Fleece Jacket',
        firstname : faker.person.firstName(),
        lastname : faker.person.lastName(),
        zipCode : faker.number.int({ min: 1000, max: 9999 }).toString(),
    }
    
    test('confirm order', async ({ page }) => {
        const menu = new menuPage(page)
        await menu.addItemToCart(testData.partNumber)
        await menu.goToCart()

        const cart = new cartPage(page)
        await cart.removeItemFromCart(testData.partNumber)
        await cart.continueShopping()

        await menu.addItemToCart(testData.partNumber)
        await menu.goToCart()

        await cart.checkout()

        const checkout = new checkoutPage(page)
        await checkout.fillField(testData.firstname, testData.lastname)
        await checkout.continueWhenFieldsNotFilled()
        await checkout.fillField(testData.firstname, testData.lastname, testData.zipCode)
        await checkout.continue()

        const overview = new overviewPage(page)
        await overview.finish()

        await menu.goToOptions()
        await menu.closeOptions()

        await menu.sortBy(1)
    });

    test('cancel order', async ({ page }) => {
        const menu = new menuPage(page)
        await menu.addItemToCart('Sauce Labs Backpack')
        await menu.goToCart()

        const cart = new cartPage(page)
        await cart.checkout()

        const checkout = new checkoutPage(page)
        await checkout.fillField(testData.firstname, testData.lastname, testData.zipCode)
        await checkout.continue()

        const overview = new overviewPage(page)
        await overview.cancel()

        await menu.goToItemByItsTitle('Sauce Labs Fleece Jacket')
        
        const item = new itemPage(page)
        await item.addItemToCart()
        await item.removeFromCart()
        await item.backToProducts()

        await menu.goToOptions()
        await menu.logout()

        const detailsForLogin = new loginDetails(false)

        const login = new loginPage(page)
        await login.login(detailsForLogin.username, detailsForLogin.password, false)
    });
});
