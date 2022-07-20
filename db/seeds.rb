# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# User.create!(
#   name:  "AdminUser",
#   email: "testuser@example.com",
#   password:              "password",
#   password_confirmation: "password",
#   admin: true,
#   activated: true,
# )

# User.create!(
#   name: "GuestUser",
#   email: "guestuser@example.com",
#   password: "guestuser",
#   password_confirmation: "guestuser",
#   activated: true,
# )

# Category.create!(
#   name: 'ご飯もの'
# )
# Category.create!(
#   name: '麺'
# )
# Category.create!(
#   name: 'パン'
# )
# Category.create!(
#   name: '卵料理'
# )
# Category.create!(
#   name: '野菜'
# )
# Category.create!(
#   name: '汁物'
# )
# Category.create!(
#   name: '鍋'
# )
# Category.create!(
#   name: 'ドリンク類'
# )
# Category.create!(
#   name: 'その他'
# )

User.create!(
  name: "竹内誠",
  email: "example04@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "森雄一",
  email: "example05@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "中村舞",
  email: "example06@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "田中達也",
  email: "example07@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "後藤祥子",
  email: "example08@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "山本和範",
  email: "example09@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "川崎あゆみ",
  email: "example10@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "小西克",
  email: "example11@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "伊藤千尋",
  email: "example12@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "大林大輔",
  email: "example13@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "森本瞳",
  email: "example14@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "倉本哲也",
  email: "example15@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "小林順子",
  email: "example16@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "橋口晋",
  email: "example17@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "谷口桂花",
  email: "example18@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "土田孔明",
  email: "example19@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "石橋彩",
  email: "example20@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)
User.create!(
  name: "伊野裕太",
  email: "example21@example.com",
  password: "password",
  password_confirmation: "password",
  activated: true,
)

first_users = User.first(5)
last_users = User.last(5)
5.times do
  title = "【タイトル】サンプルレシピ"
  ingredient = "・材料1\r\n・材料2\r\n・材料3\r\n・材料4\r\n\r\n・調味料1\r\n・調味料2\r\n・調味料3"
  body = "レシピの作り方・説明が入ります。\r\nレシピの作り方・説明が入ります。レシピの作り方・説明が入ります。レシピの作り方・説明が入ります。\r\nレシピの作り方・説明が入ります。レシピの作り方・説明が入ります。\r\nレシピの作り方・説明が入ります。レシピの作り方・説明が入ります。レシピの作り方・説明が入ります。レシピの作り方・説明が入ります。\r\nレシピの作り方・説明が入ります。レシピの作り方・説明が入ります。\r\nレシピの作り方・説明が入ります。\r\nレシピの作り方・説明が入ります。レシピの作り方・説明が入ります。\r\nレシピの作り方・説明が入ります。レシピの作り方・説明が入ります。レシピの作り方・説明が入ります。レシピの作り方・説明が入ります。"
  cost = 900
  duration = 20
  category_id = 1

  q_title = "【質問】サンプルタイトル"
  content = "質問内容が入ります。質問内容が入ります。質問内容が入ります。質問内容が入ります。質問内容が入ります。質問内容が入ります。質問内容が入ります。"

  first_users.each { |user| user.recipes.create!(title: title, ingredient: ingredient, body: body, cost: cost, duration: duration, category_id: category_id) }

  first_users.each { |user| user.questions.create!(title: q_title, content: content) }
end