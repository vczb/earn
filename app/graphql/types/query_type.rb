module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :all_users, [Types::UserType], null: false

    def all_users
        User.all
    end

    field :all_customers, [Types::CustomerType], null: false

    def all_customers
        Customer.all
    end

    field :all_transactions, [Types::TransactionType], null: false

    def all_transactions
        Transaction.all
    end

    field :all_products, [Types::ProductType], null: false

    def all_products
        Product.all
    end
    
  end
end
