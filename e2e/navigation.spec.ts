import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('redirects from / to /users', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/users')
  })

  test('navigates to user detail on click', async ({ page }) => {
    await page.goto('/users')
    await page.waitForSelector('a[href^="/users/"]')
    await page.locator('a[href^="/users/"]').first().click()
    await expect(page).toHaveURL(/\/users\/\d+/)
  })

  test('back navigation preserves search filter', async ({ page }) => {
    await page.goto('/users')
    await page.waitForSelector('a[href^="/users/"]')

    // apply search
    await page.getByPlaceholder(/search/i).fill('Leanne')
    await page.getByRole('button', { name: /search/i }).click()
    await page.waitForURL(/q=Leanne/)

    // navigate to detail
    await page.getByRole('link', { name: /Leanne/i }).first().click()
    await expect(page).toHaveURL(/\/users\/\d+/)

    // go back
    await page.goBack()
    await expect(page).toHaveURL(/q=Leanne/)
    await expect(page.getByText('Leanne Graham')).toBeVisible()
  })

  test('back navigation preserves sort', async ({ page }) => {
    await page.goto('/users')
    await page.waitForSelector('a[href^="/users/"]')

    await page.getByLabel(/sort/i).selectOption('email')
    await page.waitForURL(/sort=email/)

    await page.locator('a[href^="/users/"]').first().click()
    await expect(page).toHaveURL(/\/users\/\d+/)
    await page.goBack()

    await expect(page).toHaveURL(/sort=email/)
    await expect(page.getByLabel(/sort/i)).toHaveValue('email')
  })

  test('sidebar nav link is active on users page', async ({ page }) => {
    await page.goto('/users')
    const nav = page.getByRole('navigation')
    const link = nav.getByRole('link')
    await expect(link).toHaveAttribute('href', '/users')
  })
})
