.PHONY: cypress
cypress:
	yarn cypress open

.PHONY: cypress-test
cypress-test:
	yarn cypress run --env type=actual --env "pluginVisualRegressionCleanupUnusedImages=true"

.PHONY: pw
pw:
	yarn playwright test --ui
