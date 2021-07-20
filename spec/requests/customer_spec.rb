require 'rails_helper'

RSpec.describe "Customers", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/customer/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/customer/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/customer/update"
      expect(response).to have_http_status(:success)
    end
  end

end
