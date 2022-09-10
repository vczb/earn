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

      resources :products, except: :show

      namespace :api do
        namespace :v1 do
          post '/auth/login', to: 'authentication#login'
          post '/customer/onboarding', to: 'customers#onboarding'
          post '/customer/register', to: 'customers#register'
          get '/customer/wallet', to: 'customers#wallet'
          put  '/customer/edit', to: 'customers#edit'
          post '/transaction/purchase', to: 'transactions#purchase'
          post '/transaction/withdrawal', to: 'transactions#withdrawal'
          get '/product/list', to: 'products#list'
        end
      end
    end
  end
