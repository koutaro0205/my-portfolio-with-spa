class Api::HomeController < ApplicationController
  def index
    @recipes = json_with_image_and_user(Recipe.limit(9))
    if logged_in_now?
      @following_recipes = json_with_image_and_user(Recipe.where(user_id: [current_user.following_ids]).limit(9))
    end
    @favorite_recipes = json_with_image_and_user(Recipe.includes(:user_favorites).sort{|a,b| b.user_favorites.size <=> a.user_favorites.size}.first(9))
    # @categories = Category.all
    # @question_items = Question.order(created_at: :desc).limit(8)
    render json: { recent_recipes: @recipes, favorite_recipes: @favorite_recipes, following_recipes: @following_recipes }
  end
end