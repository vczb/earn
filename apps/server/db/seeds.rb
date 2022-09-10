# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.new(
  {
    email: 'admin@gamou.com',
    password: 'GamouR00T',
    password_confirmation: 'GamouR00T',
    is_admin: true,
    owner_name: 'Gamou',
    company_name: 'Gamou',
    phone: '051999999999',
    plan: 2
  }
).save
