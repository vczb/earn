module Mutations
  class CreateUser < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true
    argument :company_name, String, required: false
    argument :owner_name, String, required: false
    argument :phone, String, required: false
    argument :plan, Integer, required: false
    # argument :is_admin, Boolean, required: false
    argument :diamond_price_in_cents, Integer, required: false

    field :user, Types::UserType, null: false
    field :errors, [String], null: true

    def resolve(email:, password:, company_name: nil, owner_name: nil, phone: nil, plan: nil, diamond_price_in_cents: nil)

      user = User.new(
        email: email,
        password: password,
        company_name: company_name,
        owner_name: owner_name,
        phone: phone,
        plan: plan,
        is_admin: false,
        diamond_price_in_cents: diamond_price_in_cents
      )

      if user.save
        {user: user}
      else
        { errors: user.errors.full_messages }
      end

    end
  end
end
