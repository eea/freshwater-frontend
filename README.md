# WISE Freshwater: Volto Frontend

[![Release](https://img.shields.io/github/v/release/eea/freshwater-frontend?sort=semver)](https://github.com/eea/freshwater-frontend/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Ffreshwater-frontend%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto/job/freshwater-frontend/job/master/lastBuild/display/redirect)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Ffreshwater-frontend%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto/job/freshwater-frontend/job/develop/lastBuild/display/redirect)
[![Release pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Ffreshwater-frontend%2F0.21.0&build=last&subject=release%20v0.21.0%20pipeline)](https://ci.eionet.europa.eu/view/Github/job/volto/job/freshwater-frontend/job/0.21.0/lastBuild/display/redirect/)

## Documentation

A training on how to create your own website using Volto is available as part of the Plone training at [https://training.plone.org/5/volto/index.html](https://training.plone.org/5/volto/index.html).

## Getting started

1.  Install `nvm`

        touch ~/.bash_profile
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

        source ~/.bash_profile
        nvm version

1.  Install latest `NodeJS 12.x`:

        nvm install 12
        nvm use 12
        node -v
        v12.16.2

1.  Install `yarn`

        curl -o- -L https://yarnpkg.com/install.sh | bash
        yarn -v

1.  Clone:

        $ git clone https://github.com/eea/freshwater-frontend.git
        $ cd freshwater-frontend

1.  Activate `develop` add-ons

        $ yarn develop

1.  Install dependencies using Yarn

        $ yarn

1.  Start frontend in develop mode without the need to build the JS resources

        $ yarn start

1.  Or start frontend in production mode

        $ yarn start:prod

1.  See application at http://localhost:3000

## Backend

### Installation:

Plone 5 backend package for the WISE-freshwater: https://github.com/eea/freshwater-backend

1.  Install [Docker](https://docs.docker.com/install/)
1.  Install [Docker Compose](https://docs.docker.com/compose/install/)

1.  Clone (in freshwater-frontend package)

        $ cd freshwater-frontend
        $ git clone git@github.com:eea/freshwater-backend.git backend

1.  Build and run the image

        $ docker-compose build
        $ docker-compose up -d

### Start the stack:

```shell
  $ docker-compose up -d ploneapi
```

### Use the shell container to start Plone:

```shell
  $ docker-compose exec ploneapi bash
```

### Inside the Plone container, you can use the instance script to start Zope:

```shell
  $ bin/standalone fg
```

## Automated @eeacms dependencies upgrades

All the addon dependencies that are located in the dependencies section of `package.json` file that belong to @eeacms and have a `MAJOR.MINOR.PATCH` version are automatically upgraded on the release of a new version of the addon. This upgrade is done directly on the `develop` branch.

Exceptions from automated upgrades ( see https://docs.npmjs.com/cli/v8/configuring-npm/package-json#dependencies for dependency configuration examples ) :

- All github or local paths
- Any version intervals ( `^version` or `>version` or `MAJOR.MINOR.x` etc )

## Release

See [release](https://github.com/eea/ims-frontend/tree/master/RELEASE.md)

## Production

For backend image see https://github.com/eea/eea.docker.plonesaas/tree/freshwater

### Deploy

- Within `Rancher > Catalog > EEA` deploy [Volto - Freshwater](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-freshwater)
