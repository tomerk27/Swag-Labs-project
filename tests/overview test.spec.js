import { expect, test } from '@playwright/test'
import { overviewPage } from '../pages/overview'

test('cancel', async ({ page }) => {
    const overview = new overviewPage(page)
    await overview.goToPage()
    await overview.cancel()
});

test('finish', async ({ page }) => {
    const overview = new overviewPage(page)
    await overview.goToPage()
    await overview.finish()
});