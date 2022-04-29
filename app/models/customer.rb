class Customer < ApplicationRecord
  belongs_to :user
  enum gender: %i[male female other]

  validates :cpf, :user_id, presence: true
end
