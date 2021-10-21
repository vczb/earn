FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "test#{n}@user.com" }
    password { 'test123' }
  end
end
