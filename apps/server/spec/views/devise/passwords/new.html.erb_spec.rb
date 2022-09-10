require 'rails_helper'
include DeviseHelpers

describe 'devise/passwords/new' do
  before { render }
  it 'should sign_in id to be in the document ' do
    expect(rendered).to match /main id="forgot_password"/
  end
  it 'should have a form' do
    expect(rendered).to match /form/
  end
  it 'should have a email field' do
    expect(rendered).to have_field(type: 'email')
  end
  it 'should have a submit field' do
    expect(rendered).to have_button(type: 'submit', name: 'commit')
  end
  it 'should have a login link for existing users' do
    expect(rendered).to have_link(href: user_session_path)
  end
  it 'should have a login link for create users' do
    expect(rendered).to have_link(href: new_user_registration_path)
  end
end
