# frozen_string_literal: true
module Mutations
  class SignInUser < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true
    field :token, String, null: true
    field :exp, String, null: true
    field :user, Types::UserType, null: true

    def resolve(email:, password:)
      user = User.find_by(email: email)

      if user.valid_password?(password)
        token = JsonWebToken.encode(user_id: user.id)
        time = Time.now + 24.hours.to_i

        { token: token, exp: time.strftime('%m-%d-%Y %H:%M'), user: user }
      else
        raise GraphQL::ExecutionError, 'Invalid email or password'
      end
    end
  end
end
