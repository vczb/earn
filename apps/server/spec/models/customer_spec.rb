require 'rails_helper'

RSpec.describe Customer, type: :model do
  context 'validations' do
    it { is_expected.to validate_presence_of(:cpf) }
    it { is_expected.to validate_presence_of(:user_id) }
  end

  context 'relations' do
    it { is_expected.to belong_to(:user) }
  end
end
