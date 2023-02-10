Rails
  .application
  .routes
  .draw do
    # scope '(:locale)',
    #       locale: /#{I18n.available_locales.join('|')}/,
    #       defaults: {
    #         locale: I18n.default_locale
    #       } do
      root 'home#index'
      
      namespace :api do
        namespace :v1 do

          resources :products, except: :show
          resources :users

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

      # if Rails.env.development?
      mount GraphqlPlayground::Rails::Engine, at: "/playground", graphql_path: "/graphql"
      # end
      post "/graphql", to: "graphql#execute"
    # end
  end
