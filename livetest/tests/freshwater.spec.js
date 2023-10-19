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

test('eu country page', async ({ page }) => {
  // test.setTimeout(120000)
  test.slow()
  await page.goto(url('/countries/uwwt/european-union'))

  await expect(page).toHaveScreenshot('eu-page1.png')

  await page.keyboard.press('PageDown')
  await expect(page).toHaveScreenshot('eu-page2.png', { timeout: 300000, maxDiffPixels: 200 })

  // await expect(page).toHaveScreenshot({ fullPage: true, timeout: 200000 })
})
