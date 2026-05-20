import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test('toggles between light and dark mode', async ({ page }) => {
    await page.goto('/users')

    const toggle = page.getByTitle('Toggle theme')
    await expect(toggle).toBeVisible()

    // get initial theme
    const htmlEl = page.locator('html')
    const initialClass = await htmlEl.getAttribute('class')
    const wasDark = initialClass?.includes('dark') ?? false

    // click toggle
    await toggle.click()
    await page.waitForTimeout(300)

    const afterClass = await htmlEl.getAttribute('class')
    const isDark = afterClass?.includes('dark') ?? false
    expect(isDark).not.toBe(wasDark)

    // click again to revert
    await toggle.click()
    await page.waitForTimeout(300)

    const revertClass = await htmlEl.getAttribute('class')
    const revertDark = revertClass?.includes('dark') ?? false
    expect(revertDark).toBe(wasDark)
  })

  test('theme persists on navigation', async ({ page }) => {
    await page.goto('/users')

    const toggle = page.getByTitle('Toggle theme')
    const htmlEl = page.locator('html')

    // set dark mode
    const initialClass = await htmlEl.getAttribute('class')
    if (!initialClass?.includes('dark')) {
      await toggle.click()
      await page.waitForTimeout(300)
    }

    // navigate to user detail
    await page.waitForSelector('a[href^="/users/"]')
    await page.locator('a[href^="/users/"]').first().click()
    await expect(page).toHaveURL(/\/users\/\d+/)

    // theme should still be dark
    const detailClass = await htmlEl.getAttribute('class')
    expect(detailClass).toContain('dark')
  })
})
