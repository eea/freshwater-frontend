#!/bin/bash

set -x
export NODE_ENV=production

IFS=' '

ADDONS_DIR="./src/develop/"
NODE_MODULES=./node_modules

# declare remove inner packages as package.json:optimizeLiftPackages
REMOVE_INNER_PACKAGES=`./scripts/print_key.js optimizeLiftPackages`
read -ra REMOVE <<< "$REMOVE_INNER_PACKAGES"

# declare remove inner packages as package.json:optimizeLiftPackages
TRANSPILE_PACKAGES=`./scripts/print_key.js manuallyTranspile`
read -ra TRANSPILE <<< "$TRANSPILE_PACKAGES"

# Locate inner packages in ADDONS_DIR and NODE_MODULES, remove them
# Equivalent of doing:
# find node_modules | grep "node_modules/.*/node_modules/immutable$" | xargs rm -r

# optimize lifted packages in addons and node_modules
for PKG in "${REMOVE[@]}"; do
  echo Cleaning up ${PKG}

  for f in ${ADDONS_DIR}*/; do
    find $f | grep "node_modules/${PKG}$" | xargs echo
  done;

  find ${NODE_MODULES} -type d -name react | grep "node_modules\/.*node_modules\/${PKG}$" | xargs rm -r

done;


for PKG in "${TRANSPILE[@]}"; do
  echo Transpiling ${PKG}

  for f in ${ADDONS_DIR}*/; do
    find $f | \
      grep "node_modules/${PKG}$" | \
      xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
  done;

  find ${NODE_MODULES} | \
    grep "node_modules/.*/node_modules/${PKG}$" | \
    xargs -I % ./node_modules/.bin/babel --presets="@babel/env" % --out-dir %
done
