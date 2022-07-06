class Api::HomeController < ApplicationController
  def index
    @recipes = associate(Recipe.limit(9))
    @following_recipes = associate(Recipe.where(user_id: [current_user.following_ids]).limit(9)) if logged_in_now?
    @favorite_recipes = associate(Recipe.includes(:user_favorites).sort{|a,b| b.user_favorites.size <=> a.user_favorites.size}.first(9))
    @questions = Question.order(created_at: :desc).limit(8)
    render json: { recent_recipes: @recipes, favorite_recipes: @favorite_recipes, following_recipes: @following_recipes, questions: @questions }
  end

  private
    def associate(obj)
      JSON.parse(obj.to_json(include: [:category, {user: {methods: [:image_url]}}], methods: [:image_url]))
    end
end