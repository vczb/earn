require 'rails_helper'

RSpec.describe "Pontueis", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/pontuei/index"
      expect(response).to have_http_status(:success)
    end
  end

end
