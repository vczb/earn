class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @customers = Customer.where(user_id: current_user.id)
    @products = Product.where(user_id: current_user.id)

    start_of_week = Date.today.beginning_of_week
    end_of_week = Date.today.end_of_week

    week_transactions =
      Transaction.where(created_at: start_of_week..end_of_week)

    week_customer_ids = week_transactions.pluck(:customer_id).uniq

    week_customers = @customers.where(id: week_customer_ids)

    @week_sales = calculate_daily_sales(start_of_week, week_transactions)
    @week_diamonds = calculate_daily_diamonds(start_of_week, week_transactions)

    start_of_year = Date.today.beginning_of_year
    end_of_year = Date.today.end_of_year

    year_transactions =
      Transaction.where(created_at: start_of_year..end_of_year)

    year_customer_ids = year_transactions.pluck(:customer_id).uniq

    year_customers = @customers.where(id: year_customer_ids)

    @yearly_sales = calculate_monthly_sales(start_of_year, year_transactions)
    @yearly_diamonds =
      calculate_monthly_diamonds(start_of_year, year_transactions)

    @yearly_products =
      year_transactions.where(transaction_type: 'withdrawals').count

    returning_customers =
      year_customers.select do |customer|
        Transaction
          .where(customer_id: customer.id)
          .where('DATE(created_at) < ?', start_of_year)
          .exists?
      end

    new_customers = year_customers - returning_customers

    @yearly_new_customers = new_customers.count
    @yearly_returning_customers = returning_customers.count

    @yearly_customers = @yearly_returning_customers + @yearly_new_customers

    today_transactions = Transaction.where(created_at: Date.today.all_day)

    today_customer_ids = today_transactions.pluck(:customer_id).uniq

    today_customers = @customers.where(id: today_customer_ids)

    @today_sales =
      today_transactions
        .where(transaction_type: 'purchases')
        .sum(:price_in_cents) / 100

    @today_diamonds =
      today_transactions
        .where(transaction_type: 'purchases')
        .sum(:price_in_diamonds)

    @today_products =
      today_transactions.where(transaction_type: 'withdrawals').count

    returning_customers =
      today_customers.select do |customer|
        Transaction
          .where(customer_id: customer.id)
          .where('DATE(created_at) < ?', Date.today)
          .exists?
      end

    new_customers = today_customers - returning_customers

    @today_new_customers = new_customers.count
    @today_returning_customers = returning_customers.count

    @today_customers = @today_returning_customers + @today_new_customers
  end

  private

  def calculate_daily_sales(start_date, transactions)
    sales = Array.new(7, 0)

    purchase_transactions =
      transactions.select do |transaction|
        transaction.transaction_type == 'purchases'
      end

    purchase_transactions.each do |transaction|
      day_index = (transaction.created_at.to_date - start_date).to_i
      sales[day_index] += transaction.price_in_cents
    end

    sales.map! { |daily_sale| daily_sale / 100 } # Convert to dollars if needed

    sales
  end

  def calculate_daily_diamonds(start_date, transactions)
    diamonds = Array.new(7, 0)

    purchase_transactions =
      transactions.select do |transaction|
        transaction.transaction_type == 'purchases'
      end

    purchase_transactions.each do |transaction|
      day_index = (transaction.created_at.to_date - start_date).to_i
      diamonds[day_index] += transaction.price_in_diamonds
    end

    diamonds
  end

  def calculate_monthly_sales(start_date, transactions)
    sales = Array.new(12, 0)

    purchase_transactions =
      transactions.select do |transaction|
        transaction.transaction_type == 'purchases'
      end

    purchase_transactions.each do |transaction|
      month_index = transaction.created_at.month - start_date.month
      sales[month_index] += transaction.price_in_cents
    end

    sales.map! { |monthly_sale| monthly_sale / 100 } # Convert to dollars if needed

    sales
  end

  def calculate_monthly_diamonds(start_date, transactions)
    diamonds = Array.new(12, 0)

    purchase_transactions =
      transactions.select do |transaction|
        transaction.transaction_type == 'purchases'
      end

    purchase_transactions.each do |transaction|
      month_index = transaction.created_at.month - start_date.month
      diamonds[month_index] += transaction.price_in_diamonds
    end

    diamonds
  end
end
