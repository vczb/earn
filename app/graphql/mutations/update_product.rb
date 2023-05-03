module Mutations
  class UpdateProduct < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :price_in_diamonds, Integer, required: false
    argument :image, String, required: false
    argument :short_description, String, required: false
    argument :description, String, required: false

    type Types::ProductType

    def resolve(
      id:,
      name: nil,
      price_in_diamonds: nil,
      image: nil,
      short_description: nil,
      description: nil
    )
      product = Product.where(id: id, user_id: context[:current_user].id).first

      if product.present?
        product.update(
          name: name.presence || product.name,
          price_in_diamonds:
            price_in_diamonds.presence || product.price_in_diamonds,
          image: image.presence || product.image,
          short_description:
            short_description.presence || product.short_description,
          description: description.presence || product.description
        )
        product
      else
        { message: 'Product not found' }
      end
    end
  end
end
