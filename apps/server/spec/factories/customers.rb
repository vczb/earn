FactoryBot.define do
  factory :customer do
    name { 'MyString' }
    email { 'MyString' }
    phone { 'MyString' }
    gender { 1 }
    cpf { 'MyString' }
    birthday { '2021-07-24' }
    user { nil }
  end
end
