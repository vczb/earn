class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    # @customers = Customer.where(user_id: current_user.id)
    # @products = Product.where(user_id: current_user.id)

    @today_sales = calculate_today_sales
    @today_customers = calculate_today_customers
    @today_new_customers = calculate_today_new_customers
    @today_diamonds = calculate_today_diamonds
    @today_products = calculate_today_products
    @today_returning_customers = calculate_today_returning_customers

    @week_sales = calculate_week_sales
    @week_diamonds = calculate_week_diamonds

    @yearly_sales = calculate_yearly_sales
    @yearly_diamonds = calculate_yearly_diamonds

    @last_year_customers = count_unique_last_year_customers
    # @last_year_month_names = get_last_year_month_names
  end

  private

  def calculate_today_sales
    Transaction
      .where(created_at: Date.today.all_day, transaction_type: 'purchases')
      .sum(:price_in_cents) / 100
  end

  def calculate_today_customers
    Transaction
      .where(created_at: Date.today.all_day)
      .pluck(:customer_id)
      .uniq
      .count
  end

  def calculate_today_new_customers
    new_customer_ids =
      Transaction
        .where(created_at: Date.today.all_day)
        .pluck(:customer_id)
        .uniq
        .select do |customer_id|
          !Transaction
            .where(customer_id: customer_id)
            .where('DATE(created_at) < ?', Date.today)
            .exists?
        end

    Customer.where(id: new_customer_ids).count
  end

  def calculate_today_diamonds
    Transaction
      .where(created_at: Date.today.all_day, transaction_type: 'purchases')
      .sum(:price_in_diamonds)
  end

  def calculate_today_products
    Transaction.where(
      created_at: Date.today.all_day,
      transaction_type: 'withdrawals'
    ).count
  end

  def calculate_today_returning_customers
    '?'
    # TODO: Fix
    # returning_customer_ids =
    #   Transaction
    #     .where(created_at: Date.today.all_day)
    #     .pluck(:customer_id)
    #     .uniq
    #     .reject do |customer_id|
    #       Transaction
    #         .where(customer_id: customer_id)
    #         .where('DATE(created_at) = ?', Date.today)
    #         .exists?
    #     end

    # returning_customer_ids.count
  end

  def calculate_week_sales
    sales = Array.new(7, 0)

    start_of_week = Date.today.beginning_of_week
    end_of_week = Date.today.end_of_week

    week_transactions =
      Transaction.where(created_at: start_of_week..end_of_week)

    week_transactions.each do |transaction|
      day_index = (transaction.created_at.to_date - start_of_week).to_i
      sales[day_index] += transaction.price_in_cents
    end

    sales.map! { |daily_sale| daily_sale / 100 }

    sales
  end

  def calculate_week_diamonds
    diamonds = Array.new(7, 0)

    start_of_week = Date.today.beginning_of_week
    end_of_week = Date.today.end_of_week

    week_transactions =
      Transaction.where(
        created_at: start_of_week..end_of_week,
        transaction_type: 'purchases'
      )

    week_transactions.each do |transaction|
      day_index = (transaction.created_at.to_date - start_of_week).to_i
      diamonds[day_index] += transaction.price_in_diamonds
    end

    diamonds
  end

  def calculate_yearly_sales
    sales = Array.new(12, 0)

    start_of_year = Date.today.beginning_of_year
    end_of_year = Date.today.end_of_year

    year_transactions =
      Transaction.where(
        created_at: start_of_year..end_of_year,
        transaction_type: 'purchases'
      )

    year_transactions.each do |transaction|
      month_index = transaction.created_at.month - start_of_year.month
      sales[month_index] += transaction.price_in_cents
    end

    sales.map! { |monthly_sale| monthly_sale / 100 }

    sales
  end

  def calculate_yearly_diamonds
    diamonds = Array.new(12, 0)

    start_of_year = Date.today.beginning_of_year
    end_of_year = Date.today.end_of_year

    year_transactions =
      Transaction.where(
        created_at: start_of_year..end_of_year,
        transaction_type: 'purchases'
      )

    year_transactions.each do |transaction|
      month_index = transaction.created_at.month - start_of_year.month
      diamonds[month_index] += transaction.price_in_diamonds
    end

    diamonds
  end

  def count_unique_last_year_customers
    end_date = Date.today
    start_date = end_date - 11.months

    monthly_customers_counts = []
    (0..11).each do |index|
      current_date = start_date + index.months
      start_of_month = current_date.beginning_of_month
      end_of_month = current_date.end_of_month

      customer_ids =
        Transaction
          .where(
            created_at: start_of_month..end_of_month,
            transaction_type: 'purchases'
          )
          .pluck(:customer_id)
          .uniq

      monthly_customers_counts << customer_ids.count
    end

    monthly_customers_counts
  end

  def get_last_year_month_names; end
end
