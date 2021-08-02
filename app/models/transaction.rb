class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :product
  enum type: %i[purchases withdrawals]

  validates :price_in_cents, :price_in_diamonds, :type, presence: true
end
