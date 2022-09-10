FactoryBot.define do
  factory :product do
    name { 'MyString' }
    image { 'MyString' }
    short_description { 'MyString' }
    price_in_diamonds { 100 }
    description { 'MyText' }
    user
  end
end
