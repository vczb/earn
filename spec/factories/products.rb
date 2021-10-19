FactoryBot.define do
  factory :product do
    name { "MyString" }
    image { "MyString" }
    short_description { "MyString" }
    description { "MyText" }
    user { nil }
  end
end
