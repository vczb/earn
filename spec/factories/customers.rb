FactoryBot.define do
  factory :customer do
    name { "MyString" }
    email { "MyString" }
    phone { "MyString" }
    cpf { "MyString" }
    gender { 1 }
    birthday { "2021-07-14" }
    references { "" }
  end
end
