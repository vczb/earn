class CustomersController < ApplicationController
  def index
    @customer = Customer.new
  end

  def show; end

  def new
    email = customer_params['email']
    if Customer.where(email: email).count > 0
      send(:update)
      render :update and return
    else
      send(:create)
      render :create and return
    end
  end

  def update
    @customer = Customer.new

    binding.pry
  end

  def create
    @customer = Customer.new

    binding.pry
  end

  def customer_params
    params.require(:customer).permit(:email)
  end
end
