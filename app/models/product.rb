class Product < ApplicationRecord
  belongs_to :user

  validates :name,
            :price_in_cents,
            :image,
            :short_description,
            :description,
            :user_id,
            presence: true
end
