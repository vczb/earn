Rails
  .application
  .routes
  .draw do
    scope '(:locale)', locale: /#{I18n.available_locales.join('|')}/ do
      root 'home#index'
      devise_for :users, controllers: { sessions: 'users/sessions' }

      get 'dashboard', to: 'dashboard#index'

    end
  end
