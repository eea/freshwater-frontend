# Freshwater: Volto Frontend

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Ffreshwater-frontend%2Fmaster&subject=pipeline)](https://ci.eionet.europa.eu/view/Github/job/volto/job/freshwater-frontend/job/master/display/redirect)
[![Release](https://img.shields.io/github/v/release/eea/freshwater-frontend?sort=semver)](https://github.com/eea/freshwater-frontend/releases)

## Production

For backend image see https://github.com/eea/eea.docker.plonesaas/tree/freshwater

### Deploy

* Within `Rancher > Catalog > EEA` deploy [Volto - Freshwater](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-freshwater)

### Release

* Create a new release of this code via `git tag` command or [Draft new release](https://github.com/eea/freshwater-frontend/releases/new) on Github.
    * A new Docker image is built and released automatically on [DockerHub](https://hub.docker.com/r/eeacms/freshwater-frontend) based on this tag.
    * A new entry is automatically added to [Volto - Freshwater](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-freshwater) `EEA Rancher Catalog`
