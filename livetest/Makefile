.DEFAULT_GOAL: help

help:
	@echo "Run make pw"

.PHONY: pw
pw:		## start Playwright with UI, for interactive use
	yarn playwright test --ui

.PHONY: pw-run
pw-run:		## run the tests automatically. Intended for CI
	yarn playwright test --project chromium

.PHONY: pw-show
pw-show:
	yarn playwright show-report

.PHONY: cypress
cypress:
	yarn cypress open

.PHONY: cypress-test
cypress-test:
	yarn cypress run --env type=actual --env "pluginVisualRegressionCleanupUnusedImages=true"
