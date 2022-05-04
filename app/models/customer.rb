class Customer < ApplicationRecord
  belongs_to :user
  has_many :transactions

  enum gender: %i[male female other]

  validates :cpf, :user_id, presence: true
end
