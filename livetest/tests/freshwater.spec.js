import { test, expect } from '@playwright/test'

const site = 'https://water.europa.eu/freshwater'

const url = path => `${site}${path}`

test.use({
  viewport: { width: 1600, height: 1200 }
})

test('has title', async ({ page }) => {
  await page.goto(url('/'))

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/WISE Freshwater/)
})

test('homepage', async ({ page }) => {
  await page.goto(url('/'))

  await expect(page).toHaveScreenshot({ fullPage: true })
})

test('about', async ({ page }) => {
  await page.goto(url('/about/wise-freshwater'))
  await expect(page).toHaveScreenshot({ fullPage: true })
})

test('about page, relevant links', async ({ page }) => {
  await page.goto(url('/about/wise-freshwater'))

  const relevantLinksH3 = page.getByText('Relevant Links')
  const box = page.locator('css=.columns-view').filter({ has: relevantLinksH3 })
  await expect(box).toHaveScreenshot()
})
