module Mutations
  class CreateProduct < BaseMutation
  
    argument :name, String, required: true
    argument :price_in_diamonds, Integer, required: true
    argument :image, String, required: true
    argument :short_description, String, required: true
    argument :description, String, required: true
    argument :user_id, Integer, required: true

    type Types::ProductType
    
    def resolve(
      name: nil,
      price_in_diamonds: nil,
      image: nil,
      short_description: nil,
      description: nil,
      user_id: nil
    )
      Product.create!(
        name: name,
        price_in_diamonds: price_in_diamonds,
        image: image,
        short_description: short_description,
        description: description,
        user_id: user_id
      )
    end
  end
end