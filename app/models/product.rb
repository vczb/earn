class Product < ApplicationRecord
  belongs_to :user

  has_one_attached :image

  validates :name,
            :price_in_diamonds,
            :short_description,
            :description,
            :user_id,
            presence: true

  # validates :image, presence: true, blob: { content_type: ['image/png', 'image/jpg', 'image/jpeg'], size_range: 1..5.megabytes }
end
