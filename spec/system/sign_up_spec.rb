require 'rails_helper'

RSpec.describe 'Sign up' do
  context 'when user is already authenticated and visit sign up page' do
    before do
      login_as(create(:user))

      visit new_user_registration_path
    end

    include_examples 'a page with flash message with',
      type: :error,
      message: I18n.t('devise.failure.already_authenticated')
  end

  context 'when submit form' do
    let(:email) { 'john@john.com' }
    let(:password) { 'johnpassword' }
    let(:password_confirmation) { password }

    context 'with required fields' do
      context 'when user does not exist' do
        before do
          visit new_user_registration_path

          fill_form_and_sign_up(email, password, password_confirmation)
        end

        include_examples 'a page with flash message with',
          type: :success,
          message: I18n.t('devise.registrations.signed_up')

        it do
          expect(page).to have_current_path(root_path(locale: :en))
        end
      end

      context 'when user exists' do
        before { create(:user, email: email, password: password) }

        it 'render email taken error' do
          visit new_user_registration_path

          fill_form_and_sign_up(email, password, password_confirmation)
          expect_to_have_errors(email: I18n.t('errors.messages.taken'))
        end
      end
    end

    context 'without required fields' do
      context 'without email, password and password confirmation' do
        it 'render blank error to email and password' do
          visit new_user_registration_path

          fill_form_and_sign_up(nil, nil, nil)
          expect_to_have_errors(
            email: I18n.t('errors.messages.blank'),
            password: I18n.t('errors.messages.blank')
          )
        end
      end

      context 'with short password' do
        it 'render short error to password' do
          visit new_user_registration_path

          fill_form_and_sign_up(email, "abc", "abc")
          expect_to_have_errors(password: I18n.t('errors.messages.too_short.other', count: 6))
        end
      end

      context 'with wrong password confirmation' do
        it 'render password confirmation match error' do
          visit new_user_registration_path

          fill_form_and_sign_up(email, password, "asd")
          expect_to_have_errors(password_confirmation: I18n.t('errors.messages.confirmation', attribute: 'Password'))
        end
      end
    end
  end

  def fill_form_and_sign_up(email, password, password_confirmation)
    fill_in('Email', with: email)
    fill_in('Password', with: password, match: :prefer_exact)
    fill_in('Password confirmation', with: password_confirmation)
    click_on(I18n.t('devise.registrations.new.sign_up'))
  end

  def expect_to_have_errors(fields)
    within('form#new_user') do
      expect(page).to have_content(I18n.t('simple_form.error_notification.default_message'))

      [:email, :password, :password_confirmation].each do |field|
        if fields[field]
          expect(page).to have_css(".user_#{field} .error", text: fields[field])
        else
          expect(page).not_to have_css(".user_#{field} .error")
        end
      end
    end

    expect(page).to have_current_path(user_registration_path(locale: :en))
  end
end
