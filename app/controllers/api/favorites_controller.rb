class Api::FavoritesController < ApplicationController
  def create
    @recipe = Recipe.find(params[:id])
    current_user.favorite(@recipe)
    render json: { recipe: @recipe }
  end

  def destroy
    @favorite = current_user.favorites.find_by(recipe_id: params[:id])
    @recipe = @favorite.recipe
    current_user.unfavorite(@recipe)
    render json: { recipe: @recipe }
  end
end