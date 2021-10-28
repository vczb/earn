#!/bin/bash
set -e

if [ $# -eq 0 ]; then
  echo 'Installing bundle dependencies' && bundle install --quiet
  echo 'Installing yarn dependencies' && yarn install --silent
  echo 'Starting Webpack dev server ...' && ./bin/webpack-dev-server &
  echo 'Starting Rails server ...' && rm -f ./tmp/pids/server.pid && bundle exec rails s -b 0.0.0.0
else
  exec "$@"
fi
