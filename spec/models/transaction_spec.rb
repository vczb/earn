require 'rails_helper'

RSpec.describe Transaction, type: :model do
  context 'validations' do
    it { is_expected.to validate_presence_of(:price_in_cents) }
    it { is_expected.to validate_presence_of(:price_in_diamonds) }
    it { is_expected.to validate_presence_of(:transaction_type) }
  end

  context 'enums' do
    it { is_expected.to define_enum_for(:transaction_type).with_values([:purchases, :withdrawals]) }
  end

  context 'relations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:product) }
  end
end
