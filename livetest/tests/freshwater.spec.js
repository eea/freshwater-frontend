import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright' // 1

const site = 'https://water.europa.eu/freshwater'

const url = path => `${site}${path}`
const _10s = 10000

test.use({
  viewport: { width: 1600, height: 1200 },
  locale: 'en',
  timezoneId: 'Europe/Berlin'
})

test('homepage', async ({ page }) => {
  await page.goto(url('/'))

  await expect(page).toHaveTitle(/WISE Freshwater/)
  await expect(page).toHaveScreenshot({ fullPage: true, timeout: _10s })

  // const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  // expect(accessibilityScanResults.violations).toEqual([])
})

test('about', async ({ page }) => {
  await page.goto(url('/about/wise-freshwater'))
  await expect(page).toHaveScreenshot('about.png', { fullPage: true, timeout: _10s })

  const relevantLinksH3 = page.getByText('Relevant Links')
  const box = page.locator('css=.columns-view').filter({ has: relevantLinksH3 })
  await expect(box).toHaveScreenshot('about-relevant-links.png')

  // const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  // expect(accessibilityScanResults.violations).toEqual([])
})

test('eu country page', async ({ page }) => {
  // test.setTimeout(120000)
  test.slow()
  await page.goto(url('/countries/uwwt/european-union'))

  await expect(page).toHaveScreenshot('eu-page1.png')

  await page.keyboard.press('PageDown', { timeout: 10000 })
  // await expect(page).toHaveScreenshot('eu-page2.png', { timeout: 300000, maxDiffPixels: 400 })

  await page.keyboard.press('PageDown')
  await expect(page).toHaveScreenshot('eu-page3.png', { timeout: _10s })

  await page.keyboard.press('PageDown')
  await expect(page).toHaveScreenshot('eu-page4.png', { timeout: _10s })
})

test('eea accessibility page', async ({ page }) => {
  await page.goto('https://www.eea.europa.eu/en/accessibility/tests')
  // await expect(page).toHaveScreenshot('about.png', { fullPage: true, timeout: _10s })
  //
  // const relevantLinksH3 = page.getByText('Relevant Links')
  // const box = page.locator('css=.columns-view').filter({ has: relevantLinksH3 })
  // await expect(box).toHaveScreenshot('about-relevant-links.png')

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  expect(accessibilityScanResults.violations).toEqual([])
})
