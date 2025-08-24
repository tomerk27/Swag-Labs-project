import { expect, test } from '@playwright/test'
import { loginPage } from "./login"
import { generalPage } from "./general"

export class menuPage extends generalPage
{
    constructor(page)
    {
        super(page)

        this.page = page

        this.sortButton = page.locator('[data-test="product-sort-container"]')
        this.items = page.locator('.inventory_item')
    }
    
    async goToPage()
    {
        const login = new loginPage(this.page)
        await login.goToPage()
        await login.login()

        expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async sortBy(sortMethodNumber)
    {
        await this.sortButton.selectOption({ index: sortMethodNumber })

        this.items = this.page.locator('.inventory_item')

        let names = []
        let prices = []
        let item
        for(let i = 0; i < await this.items.count(); i++)
        {
            item = this.items.nth(i)
            names.push(item.locator('.inventory_item_name').textContent())
            prices.push(item.locator('.inventory_item_price').textContent())
        }

        if(sortMethodNumber < 2)
            expect(this.isTextSorted(names)).toBeTruthy()
        else
            expect(this.isTextSorted(prices)).toBeTruthy()
    }

    async isNumSorted(array)
    {
        let lowToHigh = true
        if (array[0] > array[1])
            lowToHigh = false

        for(let i = 0; i < array.length - 1; i++)
        {
            if((lowToHigh && array[i] > array[i+1]) || (!lowToHigh && array[i] < array[i+1]))
                return false
        }
        return true
    }

    async isTextSorted(array)
    {
        return JSON.stringify(array) === JSON.stringify([...array].sort()) 
         || JSON.stringify([...array].sort((a,b) => b - a)) === JSON.stringify(array)
    }

    async goToItemByItsTitle(itemName)
    {
        const item = await this.getItemByName(itemName)
        const titleLocator = item.locator('div.inventory_item_name').filter({ hasText: itemName, exact: true})

        await titleLocator.click()

        await expect(this.page.locator('[data-test="inventory-item-name"]')).toBeVisible()
        await expect(this.page.getByRole('button', { name: 'Back to products'})).toBeVisible()
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
    }

    async addItemToCart(itemName)
    {
        const backpack = await this.getItemByName(itemName)
        await backpack.locator('button', { hasText: 'add to cart' }).click()

        await expect(backpack.locator('button', { hasText: 'Remove' })).toBeVisible()
    }

    async removeItemFromCart(itemName)
    {
        const backpack = await this.getItemByName(itemName)
        await backpack.locator('button', { hasText: 'Remove' }).click()
        
        await expect(backpack.locator('button', { hasText: 'add to cart' })).toBeVisible()
    }
}