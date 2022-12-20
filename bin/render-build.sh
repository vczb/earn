#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
# bundle exec rake -W assets:precompile
# bundle exec rake assets:clean
bundle exec rake db:migrate