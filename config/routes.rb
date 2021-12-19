Rails
  .application
  .routes
  .draw do
    scope '(:locale)',
          locale: /#{I18n.available_locales.join('|')}/,
          defaults: {
            locale: I18n.default_locale
          } do
      root 'home#index'
      mount RailsAdmin::Engine => 'admin', :as => 'rails_admin'
      devise_for :users,
                 controllers: {
                   sessions: 'users/sessions',
                   registrations: 'users/registrations'
                 }

      get 'admin', to: 'admin/dashboard#index'
      get 'dashboard', to: 'dashboard#index'

      resources :products

      resources :customers
    end
  end
