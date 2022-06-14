# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create!(
  name: 'test1',
  email: 'test1@kmail.com',
  password: 'aaaaaa',
  password_confirmation: 'aaaaaa'
)
User.create!(
  name: 'test2',
  email: 'test2@kmail.com',
  password: 'bbbbbb',
  password_confirmation: 'bbbbbb'
)
User.create!(
  name: 'test3',
  email: 'test3@kmail.com',
  password: 'cccccc',
  password_confirmation: 'cccccc'
)
