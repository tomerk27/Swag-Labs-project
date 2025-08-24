import { expect, test } from "@playwright/test";
import { itemPage } from '../pages/item'
import { loginPage } from "../pages/login";
import { menuPage } from "../pages/menu";

test ('test item page', async ({ page }) => {
    const item = new itemPage(page)
    
    await item.goToPage()

    await item.addItemToCart()
    await item.removeFromCart()
    await item.backToProducts()
});