require 'nested_form/engine'
require 'nested_form/builder_mixin'
RailsAdmin.config do |config|
  ### Popular gems integration

  ## == Devise ==

  config.authenticate_with do
    redirect_to main_app.root_path unless current_user.try(:is_admin?)

    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == CancanCan ==
  # config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.main_app_name = ['Gamou']

  config.actions do
    dashboard # mandatory
    index # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'User' do
    exclude_fields :reset_password_token,
                   :encrypted_password,
                   :reset_password_sent_at,
                   :remember_created_at
  end

  config.model 'Customer' do
    show do
      field :name
      field :email
      field :phone
      field :gender
      field :cpf
      field :birthday
      field :user
    end
    list do
      field :name
      field :email
      field :phone
      field :gender
      field :cpf
      field :birthday
      field :user
    end
    edit do
      field :name
      field :email
      field :phone
      field :gender
      field :cpf
      field :birthday
      field :user
    end
  end

  config.model 'Product' do
    edit do
      field :name
      field :price_in_diamonds
      field :image
      field :short_description
      field :description
      field :user
    end
  end
end
