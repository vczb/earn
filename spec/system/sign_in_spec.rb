require 'rails_helper'

RSpec.describe 'Sign in' do
  context 'when user is already authenticated' do
    before do
      login_as(create(:user))
      visit new_user_session_path
    end

    it_behaves_like 'a page with flash message with',
      type: :error,
      message: I18n.t('devise.failure.already_authenticated')
  end

  context 'when submit form' do
    let(:email) { 'john@john.com' }
    let(:password) { 'johnpassword' }

    context 'with required fields' do
      context 'when user does not exists' do
        before do
          visit new_user_session_path

          fill_form_and_sign_in(email, password)
        end

        include_examples 'a page with flash message with',
          type: :error,
          message: I18n.t('devise.failure.not_found_in_database', authentication_keys: 'Email')

        it do
          expect(page).to have_current_path(new_user_session_path(locale: :en))
        end
      end

      context 'when user exists' do
        before do
          create(:user, email: email, password: password)

          visit new_user_session_path

          fill_form_and_sign_in(email, password)
        end

        include_examples 'a page with flash message with',
          type: :success,
          message: I18n.t('devise.sessions.signed_in')

        it do
          expect(page).to have_current_path(root_path(locale: :en))
        end
      end
    end

    context 'without required fields' do
      [
        [:email, :password],
        [:password],
        [:email],
      ].each do |blank_fields|
        context "without #{blank_fields.join(' end ')}" do
          before do
            visit new_user_session_path

            fill_form_and_sign_in(
              blank_fields.exclude?(:email) ? email : nil,
              blank_fields.exclude?(:password) ? password : nil
            )
            expect(page).to have_current_path(new_user_session_path(locale: :en))
          end

          include_examples 'a page with flash message with',
            type: :error,
            message: I18n.t('devise.failure.not_found_in_database', authentication_keys: 'Email')
        end
      end
    end
  end

  def fill_form_and_sign_in(email, password)
    fill_in('Email', with: email)
    fill_in('Password', with: password)
    click_on('Login')
  end
end
