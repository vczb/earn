class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @today_sales = 530
    @today_diamonds = 315
    @today_products = 7
    @today_new_customers = 25
    @today_returning_customers = 48
    @today_customers = @today_returning_customers + @today_new_customers
  end
end
