require 'rails_helper'

RSpec.describe 'Logout' do
  before do
    login_as(create(:user))

    visit root_path

    click_link('Logout')
  end

  include_examples 'a page with flash message with',
    type: :success,
    message: I18n.t('devise.sessions.signed_out')

  it 'render sign in button' do
    expect(page).to have_link('Login')
  end
end
