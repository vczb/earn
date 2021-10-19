require 'rails_helper'

RSpec.describe 'product/index.html.erb' do
  subject { rendered }

  it 'Product should be in the document' do
    render

    is_expected.to match /id="product"/
    is_expected.to have_css('h1', text: I18n.t('web.product.your_products'))
  end

  it 'render link to create products page' do
    render

    is_expected.to have_link(href: product_new_path)
  end

  context 'when @products is not assigned' do
    it 'render no products texts' do
      render

      is_expected.to have_css('h1', text: I18n.t('web.product.no_products'))
    end
  end

  context 'when @products is not assigned' do
    let(:product) { build_stubbed(:product) }

    before { assign(:products, [product]) }

    it 'render products' do
      render

      is_expected.to have_css("img[src=#{product.image}]")
      is_expected.to have_css('p', text: product.name)
      is_expected.to have_css('p', text: product.short_description)
      is_expected.to have_css('p', text: product.price_in_diamonds)
      is_expected.to have_link(href: product_edit_path(id: product.id))
      is_expected.to have_link(href: product_destroy_path(id: product.id))
    end
  end
end
