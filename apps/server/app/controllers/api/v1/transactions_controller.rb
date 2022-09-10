module Api
  module V1
    class TransactionsController < ApiApplicationController
      before_action :authorize_request, except: :login

      # POST /transaction/purchase
      def purchase
        begin
          @transaction = Transaction.new

          @transaction.user_id = transaction_params[:user_id]
          @transaction.customer_id = transaction_params[:customer_id]
          @transaction.transaction_type = 'purchases'

          @user = User.find_by(id: transaction_params[:user_id])

          if @user.present? && @transaction.present?
            count_diamonds =
              @transaction.calc_diamonds(
                transaction_params[:value],
                @user.diamond_price_in_cents
              )

            @transaction.price_in_cents = @user.diamond_price_in_cents
            @transaction.price_in_diamonds = count_diamonds

            if @transaction.save
              render json: {
                       message: 'Transaction created successfully',
                       transaction: @transaction
                     },
                     status: :ok
            else
              render json: {
                       message: 'Transaction not created',
                       error: {
                         message: @transaction.errors.full_messages.join(', ')
                       }
                     },
                     status: :unprocessable_entity
            end
          else
            render json: { message: 'User ID not found' }, status: :not_found
          end
        rescue Exception => e
          render json: { error: { message: e } }, status: :internal_server_error
        end
      end

      # POST /transaction/withdrawal
      def withdrawal
        begin
          @transaction = Transaction.new

          @transaction.user_id = transaction_params[:user_id]
          @transaction.customer_id = transaction_params[:customer_id]
          @transaction.product_id = transaction_params[:product_id]
          @transaction.transaction_type = 'withdrawals'

          @product = Product.find_by(id: transaction_params[:product_id])
          @user = User.find_by(id: transaction_params[:user_id])

          if @user.present? && @transaction.present? && @product.present?
            @transaction.price_in_cents = @user.diamond_price_in_cents
            @transaction.price_in_diamonds = @product.price_in_diamonds

            if @transaction.save
              render json: {
                       message: 'Transaction created successfully',
                       transaction: @transaction
                     },
                     status: :ok
            else
              render json: {
                       message: 'Transaction not created',
                       error: {
                         message: @transaction.errors.full_messages.join(', ')
                       }
                     },
                     status: :unprocessable_entity
            end
          else
            render json: { message: 'User ID not found' }, status: :not_found
          end
        rescue Exception => e
          render json: { error: { message: e } }, status: :internal_server_error
        end
      end

      private

      def transaction_params
        params.permit(:user_id, :customer_id, :value, :product_id)
      end
    end
  end
end
