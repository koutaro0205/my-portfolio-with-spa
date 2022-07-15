# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(
  name:  "AdminUser",
  email: "testuser@example.com",
  password:              "password",
  password_confirmation: "password",
  admin: true,
  activated: true,
)

User.create!(
  name: "GuestUser",
  email: "guestuser@example.com",
  password: "guestuser",
  password_confirmation: "guestuser",
  activated: true,
)

Category.create!(
  name: 'ご飯もの'
)
Category.create!(
  name: '麺'
)
Category.create!(
  name: 'パン'
)
Category.create!(
  name: '卵料理'
)
Category.create!(
  name: '野菜'
)
Category.create!(
  name: '汁物'
)
Category.create!(
  name: '鍋'
)
Category.create!(
  name: 'ドリンク類'
)
Category.create!(
  name: 'その他'
)