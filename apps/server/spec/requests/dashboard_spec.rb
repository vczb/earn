require 'rails_helper'

RSpec.describe DashboardController do
  before { login_as create(:user) }

  describe 'GET /index' do
    it 'renders a successful response' do
      get dashboard_path
      expect(response).to be_successful
    end
  end
end
