require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validate new user' do
    it 'should create a valid user' do
      user = User.new(email: 'test@example.com', password: '123456')
      expect(user).to be_valid
    end
    it 'should create a user without email and its be invalid user' do
      user = User.new(password: '123456')
      expect(user).to_not be_valid
    end
    it 'should create a user without password and its be invalid user' do
      user = User.new(email: 'test@example.com')
      expect(user).to_not be_valid
    end
  end
end
