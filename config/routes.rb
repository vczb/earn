Rails
  .application
  .routes
  .draw do
    scope '(:locale)', locale: /#{I18n.available_locales.join('|')}/ do
      root 'home#index'
      mount RailsAdmin::Engine => 'admin', :as => 'rails_admin'
      devise_for :users, controllers: { sessions: 'users/sessions' }

      get 'admin', to: 'admin/dashboard#index'
      get 'dashboard', to: 'dashboard#index'
    end
  end
