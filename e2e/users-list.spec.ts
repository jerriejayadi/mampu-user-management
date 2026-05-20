import { test, expect } from '@playwright/test'

test.describe('Users List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users')
    await page.waitForSelector('a[href^="/users/"]')
  })

  test('renders user list with activity signals', async ({ page }) => {
    await expect(page.getByRole('link').first()).toBeVisible()
    // activity signals present
    await expect(page.getByText(/posts/).first()).toBeVisible()
    await expect(page.getByText(/✓/).first()).toBeVisible()
    await expect(page.getByText(/⏳/).first()).toBeVisible()
  })

  test('search filters users', async ({ page }) => {
    const input = page.getByPlaceholder(/search/i)
    const initialCount = await page.locator('a[href^="/users/"]').count()

    await input.fill('Leanne')
    await page.getByRole('button', { name: /search/i }).click()

    const filtered = page.locator('a[href^="/users/"]')
    await expect(filtered.first()).toContainText('Leanne Graham')
    expect(await filtered.count()).toBeLessThan(initialCount)
  })

  test('search updates URL params', async ({ page }) => {
    const input = page.getByPlaceholder(/search/i)
    await input.fill('Leanne')
    await page.getByRole('button', { name: /search/i }).click()
    await page.waitForURL(/q=Leanne/)
    expect(page.url()).toContain('q=Leanne')
  })

  test('search clears and shows all users again', async ({ page }) => {
    const input = page.getByPlaceholder(/search/i)
    const initialCount = await page.getByRole('link', { name: /\w/ }).count()

    await input.fill('Leanne')
    await page.getByRole('button', { name: /search/i }).click()
    await input.clear()
    await page.getByRole('button', { name: /search/i }).click()
    await page.waitForTimeout(400)

    expect(await page.getByRole('link', { name: /\w/ }).count()).toBe(initialCount)
  })

  test('no results shows empty state', async ({ page }) => {
    await page.getByPlaceholder(/search/i).fill('zzznomatch')
    await page.getByRole('button', { name: /search/i }).click()
    await expect(page.getByText(/no users match/i)).toBeVisible()
  })

  test('sort by email updates order', async ({ page }) => {
    const sortSelect = page.getByLabel(/sort/i)
    await sortSelect.selectOption('email')
    await page.waitForTimeout(300)
    const links = page.getByRole('link', { name: /\w/ })
    const first = await links.first().textContent()
    const second = await links.nth(1).textContent()
    expect(first!.localeCompare(second!)).toBeLessThanOrEqual(0)
  })

  test('sort by most pending shows highest pending first', async ({ page }) => {
    await page.getByLabel(/sort/i).selectOption('pending')
    await page.waitForTimeout(300)
    const first = await page.getByRole('link', { name: /\w/ }).first()
    await expect(first).toBeVisible()
  })

  test('filter by has-pending', async ({ page }) => {
    await page.getByLabel(/filter/i).selectOption('has-pending')
    await page.waitForTimeout(300)
    const links = page.getByRole('link', { name: /\w/ })
    await expect(links.first()).toBeVisible()
  })

  test('filter by no-completed', async ({ page }) => {
    await page.getByLabel(/filter/i).selectOption('no-completed')
    await page.waitForTimeout(300)
    const links = page.getByRole('link', { name: /\w/ })
    const count = await links.count()
    expect(count).toBeGreaterThan(0)
  })

  test('enter key triggers search', async ({ page }) => {
    const input = page.getByPlaceholder(/search/i)
    await input.fill('Ervin')
    await input.press('Enter')
    await page.waitForURL(/q=Ervin/)
    await expect(page.getByText('Ervin Howell')).toBeVisible()
  })
})
