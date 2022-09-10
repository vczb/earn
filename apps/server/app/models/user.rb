class User < ApplicationRecord
  DEFAULT_PLAN = 'trial'

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable

  validates :company_name,
            :owner_name,
            :phone,
            :plan,
            presence: true,
            on: :update

  enum plan: %i[trial monthly semester yearly], _default: DEFAULT_PLAN
end
