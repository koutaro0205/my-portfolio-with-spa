# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(name:  "Admin User",
  email: "testuser@example.com",
  password:              "password",
  password_confirmation: "password",
  admin: true,
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

User.create!(name:  "Example User2",
  email: "testuser2@example.com",
  password:              "password",
  password_confirmation: "password",
  activated: true,
)

User.create!(name:  "Example User3",
  email: "testuser3@example.com",
  password:              "password",
  password_confirmation: "password",
  activated: true,
)

User.create!(name:  "Example User4",
  email: "testuser4@example.com",
  password:              "password",
  password_confirmation: "password",
  activated: true,
)

5.times do |n|
  Recipe.create!(
    title: "質問のタイトル",
    ingredient: "材料",
    cost: 600,
    duration: 20,
    user_id: 1,
    category_id: 1,
  )
end

5.times do |n|
  Question.create!(
    title: "質問のタイトル",
    content: "質問内容を入力します。",
    user_id: 1,
  )
end