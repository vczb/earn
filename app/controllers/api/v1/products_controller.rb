module Api
  module V1
    class ProductsController < ApiApplicationController
      before_action :authorize_request, except: :login

      # GET /product/list
      def list
        @products = Product.where(user_id: list_params[:user_id])

        render json: { products: @products.map do |product|
          {
            id: product.id,
            user_id: product.user_id,
            name: product.name,
            description: product.description,
            short_description: product.short_description,
            price_in_diamonds: product.price_in_diamonds,
            image: url_for(product.image || "")
          }
        end }
      end

      private

      def list_params
        params.permit(:user_id)
      end
    end
  end
end
