const { defineConfig } = require('cypress')
const getCompareSnapshotsPlugin = require('cypress-visual-regression-resemble-js/dist/plugin')

module.exports = defineConfig({
  env: {
    screenshotsFolder: './cypress/snapshots/actual',
    trashAssetsBeforeRuns: true,
    video: false
  },
  e2e: {
    setupNodeEvents (on, config) {
      getCompareSnapshotsPlugin(on, config)
    }
  }
})
