import { test, expect } from '@playwright/test'

test.describe('User Detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users/1')
  })

  test('renders profile sidebar with user info', async ({ page }) => {
    await expect(page.getByText('Leanne Graham')).toBeVisible()
    await expect(page.getByText('@Bret')).toBeVisible()
    await expect(page.getByText(/Sincere@april\.biz/i)).toBeVisible()
    await expect(page.getByText(/Romaguera-Crona/i)).toBeVisible()
    await expect(page.getByText(/Gwenborough/i)).toBeVisible()
  })

  test('posts tab is active by default', async ({ page }) => {
    await expect(page.getByRole('button', { name: /posts/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /todos/i })).toBeVisible()
    // posts content visible
    const postItems = page.locator('li p.font-medium')
    await expect(postItems.first()).toBeVisible()
  })

  test('switches to todos tab', async ({ page }) => {
    await page.getByRole('button', { name: /todos/i }).click()
    // todos summary visible
    await expect(page.getByText(/done/i)).toBeVisible()
    await expect(page.getByText(/pending/i)).toBeVisible()
    // individual todos visible
    const todoItems = page.locator('li').filter({ hasText: /✓|⏳/ })
    await expect(todoItems.first()).toBeVisible()
  })

  test('show more loads additional posts', async ({ page }) => {
    const showMore = page.getByRole('button', { name: /show more/i })
    if (await showMore.isVisible()) {
      const before = await page.locator('li p.font-medium').count()
      await showMore.click()
      const after = await page.locator('li p.font-medium').count()
      expect(after).toBeGreaterThan(before)
    }
  })

  test('show more loads additional todos', async ({ page }) => {
    await page.getByRole('button', { name: /todos/i }).click()
    const showMore = page.getByRole('button', { name: /show more/i })
    if (await showMore.isVisible()) {
      const before = await page.locator('li').filter({ hasText: /✓|⏳/ }).count()
      await showMore.click()
      const after = await page.locator('li').filter({ hasText: /✓|⏳/ }).count()
      expect(after).toBeGreaterThan(before)
    }
  })

  test('back to list link works', async ({ page }) => {
    await page.getByRole('link', { name: /back to list/i }).click()
    await expect(page).toHaveURL('/users')
  })

  test('page title includes user name', async ({ page }) => {
    await expect(page).toHaveTitle(/Leanne Graham/)
  })
})
