FactoryBot.define do
  factory :product do
    name { "MyString" }
    price_in_cents { 1 }
    image { "MyString" }
    short_description { "MyString" }
    description { "MyText" }
    user { nil }
  end
end
