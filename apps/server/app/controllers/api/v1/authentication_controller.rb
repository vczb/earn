module Api
  module V1
    class AuthenticationController < ApiApplicationController
      before_action :authorize_request, except: :login

      # POST /auth/login
      def login
        @user = User.find_by_email(params[:email])
        if @user&.valid_password?(params[:password])
          token = JsonWebToken.encode(user_id: @user.id)
          time = Time.now + 24.hours.to_i

          puts @user

          render json: {
                   jwt: token,
                   exp: time.strftime('%m-%d-%Y %H:%M'),
                   user: @user
                 },
                 status: :ok
        else
          render json: { error: 'unauthorized' }, status: :unauthorized
        end
      end

      private

      def login_params
        params.permit(:email, :password)
      end
    end
  end
end
