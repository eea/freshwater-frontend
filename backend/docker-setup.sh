#!/bin/bash

runDeps="
  build-essential
  silversearcher-ag
  tmux
  mc
  procps
"

echo "========================================================================="
echo "Installing $runDeps"
echo "========================================================================="

apt-get update
apt-get install -y --no-install-recommends $runDeps

echo "========================================================================="
echo "Running buildout -c develop.cfg"
echo "========================================================================="

buildout -c site.cfg

echo "========================================================================="
echo "Cleaning up cache..."
echo "========================================================================="

rm -vrf /var/lib/apt/lists/*
rm -vrf /plone/buildout-cache/downloads/*

echo "========================================================================="
echo "Fixing permissions..."
echo "========================================================================="

find /data  -not -user plone -exec chown plone:plone {} \+
find /plone -not -user plone -exec chown plone:plone {} \+
