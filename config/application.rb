require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

def set_locate_configs_and_timezone
  config.time_zone = 'Brasilia'
  config.i18n.load_path +=
    Dir[Rails.root.join('config', 'locales', '**/*.{rb,yml}').to_s]
    config.i18n.available_locales = ['pt-BR', 'en']
    config.i18n.default_locale = 'pt-BR'
  end

module Gamou
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    set_locate_configs_and_timezone
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
