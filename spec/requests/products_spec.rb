require 'rails_helper'

RSpec.describe ProductsController do
  let(:user) { create(:user) }

  let(:valid_attributes) do
    {
      name: 'Product 1',
      price_in_diamonds: 100,
      image: 'http://host.com/image.png',
      short_description: 'Awesome product 1',
      description: 'Insane awesome product 1'
    }
  end

  before { login_as user }

  describe 'GET /index' do
    let!(:product) { create(:product) }

    it 'renders a successful response' do
      get products_path
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get new_product_path
      expect(response).to be_successful
    end
  end

  describe 'GET /edit' do
    let!(:product) { create(:product) }

    it 'render a successful response' do
      get edit_product_path(product.id)
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Product' do
        expect {
          post products_path, params: { product: valid_attributes }
        }.to change(Product, :count).by(1)
      end

      it 'redirects to the created product' do
        post products_path, params: { product: valid_attributes }
        expect(response).to redirect_to(products_path)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Product' do
        expect {
          post products_path, params: { product: { name: 'Product' } }
        }.to change(Product, :count).by(0)
        expect(response).to be_successful
      end
    end
  end

  describe 'PATCH /update' do
    let!(:product) { create(:product) }

    context 'with valid parameters' do
      let(:new_attributes) { { name: 'Product 1 - Updated' } }

      it 'updates the requested product' do
        patch product_path(product), params: { product: new_attributes }

        expect(product.reload.name).to eq(new_attributes[:name])
        expect(response).to redirect_to(products_path)
      end
    end

    context 'with invalid parameters' do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        patch product_path(product), params: { product: { price_in_diamonds: nil } }
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE /destroy' do
    let!(:product) { create(:product) }

    it 'destroys the requested product' do
      expect { delete product_path(product.id) }.to change(Product, :count).by(-1)
      expect(response).to redirect_to(products_path)
    end
  end
end
