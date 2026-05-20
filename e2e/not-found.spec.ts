import { test, expect } from '@playwright/test'

test.describe('Not Found', () => {
  test('shows not-found page for invalid user id', async ({ page }) => {
    await page.goto('/users/99999')
    await expect(page.getByRole('heading', { name: 'User Not Found' })).toBeVisible()
    await expect(page.getByText("That user ID does not exist.")).toBeVisible()
  })

  test('has link back to users list', async ({ page }) => {
    await page.goto('/users/99999')
    const link = page.getByRole('link', { name: /back to users/i })
    await expect(link).toBeVisible()
    await link.click()
    await expect(page).toHaveURL('/users')
  })

  test('shows not-found for non-numeric id', async ({ page }) => {
    await page.goto('/users/abc')
    await expect(page.getByRole('heading', { name: 'User Not Found' })).toBeVisible()
  })
})
