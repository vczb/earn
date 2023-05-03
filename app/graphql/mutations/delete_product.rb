module Mutations
  class DeleteProduct < BaseMutation
    argument :id, Integer, required: true

    type Types::ProductType

    def resolve(id: nil)
      user_id = context[:current_user].id
      product = Product.where(user_id: user_id, id: id).first
      product.destroy if product.present?
      product
    end
  end
end
