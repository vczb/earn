module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :all_users, [Types::UserType], null: false

    def all_users
      User.where(id: context[:current_user].id)
    end

    field :all_customers, [Types::CustomerType], null: false

    def all_customers
      Customer.where(user_id: context[:current_user].id)
    end

    field :all_transactions, [Types::TransactionType], null: false

    def all_transactions
      Transaction.where(user_id: context[:current_user].id)
    end

    field :all_products, [Types::ProductType], null: false

    def all_products
      Product.where(user_id: context[:current_user].id)
    end
  end
end
