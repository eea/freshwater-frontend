# Freshwater: Volto Frontend

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto%2Ffreshwater-frontend%2Fmaster&subject=pipeline)](https://ci.eionet.europa.eu/view/Github/job/volto/job/freshwater-frontend/job/master/display/redirect)
[![Release](https://img.shields.io/github/v/release/eea/freshwater-frontend?sort=semver)](https://github.com/eea/freshwater-frontend/releases)

## Documentation

A training on how to create your own website using Volto is available as part of the Plone training at [https://training.plone.org/5/volto/index.html](https://training.plone.org/5/volto/index.html).


## Getting started

1. Clone:

        $ git clone https://github.com/eea/freshwater-frontend.git
        $ cd freshwater-frontend

1. Install `nvm`

        $ touch ~/.bash_profile
        $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

        $ source ~/.bash_profile
        $ nvm version

1. Install latest `NodeJS 12.x`:

        $ nvm install 12
        $ nvm use 12
        $ node -v
        v12.16.2

1. Install `yarn`

        $ curl -o- -L https://yarnpkg.com/install.sh | bash
        $ yarn -v

1. Install

        $ yarn

1. Start and setup backend

         $ docker-compose up -d

    * Go to `http://localhost:8080` [Advanced](http://localhost:8080/@@plone-addsite?site_id=Plone&advanced=1):
    * Add `Plone` site with add-ons enabled (**user:** `admin`, **password:** `admin`):
        * `kitconcept.volto`

1. Start frontend

        $ yarn start

1. See application at http://localhost:3000

## Try it

1. Install [Docker](https://docs.docker.com/install/)
1. Install [Docker Compose](https://docs.docker.com/compose/install/)
1. Start:

        $ git clone https://github.com/eea/freshwater-frontend.git
        $ cd freshwater-frontend

        $ docker-compose pull
        $ docker-compose up -d

   optionally change `PORTS` via `.env`:

        $ FRONTEND=9000 BACKEND=9100 docker-compose up -d

1. Go to `http://localhost:8080` [Advanced](http://localhost:8080/@@plone-addsite?site_id=Plone&advanced=1):
    * Add `Plone` site with add-ons enabled (**user:** `admin`, **password:** `admin`):
        * `kitconcept.volto`

1. See application at http://localhost:8000


## Production

We use [Docker](https://www.docker.com/), [Rancher](https://rancher.com/) and [Jenkins](https://jenkins.io/) to deploy this application in production.

### Deploy

* Within `Rancher > Catalog > EEA` deploy [Volto - Freshwater](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-freshwater)

### Release

* Create a new release of this code via `git tag` command or [Draft new release](https://github.com/eea/freshwater-frontend/releases/new) on Github.
    * A new Docker image is built and released automatically on [DockerHub](https://hub.docker.com/r/eeacms/freshwater-frontend) based on this tag.
    * A new entry is automatically added to [Volto - Freshwater](https://github.com/eea/eea.rancher.catalog/tree/master/templates/volto-freshwater) `EEA Rancher Catalog`

### Upgrade

* Within your Rancher environment click on the `Upgrade available` yellow button next to your stack.

* Confirm the upgrade

* Or roll-back if something went wrong and abort the upgrade procedure.
