module Api
  module V1
    class CustomersController < ApiApplicationController
      before_action :authorize_request, except: :login

      # POST /customers/onboarding
      def onboarding
        @customer =
          Customer.find_by(cpf: params[:cpf], user_id: params[:user_id])

        if @customer.present?
          render json: @customer
        else
          render json: {
                   cpf: params[:cpf],
                   message: 'Customer not found'
                 },
                 status: :not_found
        end
      end

      # POST /customers/register
      def register
        begin
          @customer = Customer.new(register_params)

          id = register_params[:user_id].rjust(2, '0')
          cpf = register_params[:cpf].gsub(/[^0-9]/, '')

          @customer.uid = "#{id}#{cpf}"

          if @customer.save
            render json: @customer
          else
            render json: { message: 'Customer not found' }, status: :not_found
          end
        rescue Exception => e
          render json: {
                   error: {
                     message: e.message
                   }
                 },
                 status: :internal_server_error
        end
      end

      # PUT /customers/edit
      def edit
        begin
          id = register_params[:user_id].rjust(2, '0')
          cpf = register_params[:cpf].gsub(/[^0-9]/, '')
          uid = "#{id}#{cpf}"

          @customer = Customer.find_by(uid: uid)

          if @customer.present?
            @customer.update(edit_params)

            render json: @customer
          else
            render json: {
                     message: 'Customer not found',
                     cpf: params[:cpf]
                   },
                   status: :not_found
          end
        rescue Exception => e
          render json: {
                   error: {
                     message: e.message
                   }
                 },
                 status: :internal_server_error
        end
      end

      # GET /customers/edit
      def wallet
        begin
          @transactions = Transaction.where(wallet_params)

          diamonds =
            @transactions.reduce(0) do |sum, transaction|
              if transaction.transaction_type === 'purchases'
                sum + transaction.price_in_diamonds
              else
                sum - transaction.price_in_diamonds
              end
            end

          render json: { diamonds: diamonds }
        rescue Exception => e
          render json: {
                   error: {
                     message: e.message
                   }
                 },
                 status: :internal_server_error
        end
      end

      private

      def onboarding_params
        params.permit(:cpf, :user_id)
      end

      def register_params
        params.permit(:cpf, :user_id, :name, :email, :phone, :user_id)
      end

      def edit_params
        params.permit(:cpf, :user_id, :name, :email, :phone, :user_id)
      end

      def wallet_params
        params.permit(:customer_id, :user_id)
      end
    end
  end
end
