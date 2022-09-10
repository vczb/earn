class Product < ApplicationRecord
  belongs_to :user

  validates :name,
            :price_in_diamonds,
            :image,
            :short_description,
            :description,
            :user_id,
            presence: true
end
