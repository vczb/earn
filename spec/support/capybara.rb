require 'capybara/rails'
require 'capybara/rspec'
require 'selenium/webdriver'
require 'webdrivers/chromedriver'

Capybara.register_driver :selenium_chrome_headless do |app|
  Capybara::Selenium::Driver.new app,
    browser: :chrome,
    desired_capabilities: Selenium::WebDriver::Remote::Capabilities.chrome(
      'goog:chromeOptions' => {
        'args' => [
          'headless',
          'disable-gpu',
          'disable-site-isolation-trials',
          'window-size=1280,900',
        ],
      }
    )
end

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    driven_by :selenium_chrome_headless
  end
end
