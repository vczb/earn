require 'rails_helper'
include DeviseHelpers

describe 'devise/registrations/new' do
  before { render }
  it 'should sign_in id to be in the document ' do
    expect(rendered).to match /main id="sign_up"/
  end
  it 'should have a form' do
    expect(rendered).to match /form/
  end
  it 'should have a email field' do
    expect(rendered).to have_field(type: 'email')
  end
  it 'should have a password field' do
    expect(rendered).to have_field(type: 'password', name: 'user[password]')
  end
  it 'should have a submit field' do
    expect(rendered).to have_button(type: 'submit', name: 'commit')
  end
  it 'should have a login link for existing users' do
    expect(rendered).to have_link(href: user_session_path)
  end
  it 'should have a login link for forgot password' do
    expect(rendered).to have_link(href: new_user_password_path)
  end
end
