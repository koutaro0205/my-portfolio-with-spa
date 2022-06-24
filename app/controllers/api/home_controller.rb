class Api::HomeController < ApplicationController
  def index
    @recipes = Recipe.limit(9).to_json(include: {user: {methods: [:image_url]}}, methods: [:image_url])
    # @following_recipes = Recipe.where(user_id: [current_user.following_ids]).limit(9) if logged_in?
    # @favorite_recipes = Recipe.includes(:user_favorites).sort{|a,b| b.user_favorites.size <=> a.user_favorites.size}.first(9)
    # @categories = Category.all
    # @question_items = Question.order(created_at: :desc).limit(8)
    render json: { recent_recipes: JSON.parse(@recipes) }
  end
end