# frozen_string_literal: true

module Types
  class CustomerType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :email, String
    field :phone, String
    field :gender, Integer
    field :dni, String
    field :birthday, GraphQL::Types::ISO8601Date
    field :user_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :uid, String
  end
end
