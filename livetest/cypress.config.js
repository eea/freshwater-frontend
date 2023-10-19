const plugin = require('@frsource/cypress-plugin-visual-regression-diff/plugins')
const { defineConfig } = require('cypress')

// const getCompareSnapshotsPlugin = require('cypress-visual-regression-resemble-js/dist/plugin')

module.exports = defineConfig({
  env: {
    // screenshotsFolder: './cypress/snapshots/actual',
    // failSilently: false,
    // capture: 'fullPage',
    // trashAssetsBeforeRuns: true,
    // video: false
  },
  e2e: {
    setupNodeEvents (on, config) {
      plugin.initPlugin(on, config)

      // getCompareSnapshotsPlugin(on, config)
    }
  }
})
