require 'rails_helper'

RSpec.describe Customer, type: :model do
  context 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:phone) }
    it { is_expected.to validate_presence_of(:gender) }
    it { is_expected.to validate_presence_of(:cpf) }
    it { is_expected.to validate_presence_of(:birthday) }
    it { is_expected.to validate_presence_of(:user_id) }
  end

  context 'enums' do
    it { is_expected.to define_enum_for(:gender).with_values([:male, :female, :other]) }
  end

  context 'relations' do
    it { is_expected.to belong_to(:user) }
  end
end
