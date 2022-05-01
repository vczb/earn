class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :customer
  belongs_to :product, optional: true

  validates :price_in_cents,
            :price_in_diamonds,
            :transaction_type,
            presence: true

  enum transaction_type: %i[purchases withdrawals], _default: 'purchases'

  def calc_diamonds(value, price_in_cents)
    price = (price_in_cents / 100).to_f.round(2)
    diamonds = (value / price).to_i
  end
end
