# frozen_string_literal: true

module Types
  class TransactionType < Types::BaseObject
    field :id, ID, null: false
    field :price_in_cents, Integer
    field :price_in_diamonds, Integer
    field :transaction_type, Integer
    field :product_id, Integer
    field :user_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :customer_id, Integer, null: false
  end
end
