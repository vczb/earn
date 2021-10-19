require 'rails_helper'

RSpec.describe 'dashboard/index.html.erb' do
  subject { rendered }

  it 'Dashboard should be in the document' do
    render

    is_expected.to match /id="dashboard"/
  end

  context 'metrics' do
    before do
      assign(:today_sales, 123)
      assign(:today_customers, 321)
      assign(:today_new_customers, 4002)
      assign(:today_diamonds, 8922)
      assign(:today_products, 800)
      assign(:today_returning_customers, 17)
    end

    it 'render all assigned metrics'do
      render

      is_expected.to have_content(/Today's sales.*USD\$ 123/m)
      is_expected.to have_content(/Today's customers.* 321/m)
      is_expected.to have_content(/New customers.* 4002/m)
      is_expected.to have_content(/Today's diamonds.* 8922/m)
      is_expected.to have_content(/Redeemed products.* 800/m)
      is_expected.to have_content(/Recurring customers.* 17/m)
    end
  end
end
