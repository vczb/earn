module Api
  module V1
    class ProductsController < ApiApplicationController
      before_action :authorize_request, except: :login

      # GET /product/list
      def list
        @products = Product.where(user_id: list_params[:user_id])

        render json: { products: @products }
      end

      private

      def list_params
        params.permit(:user_id)
      end
    end
  end
end
