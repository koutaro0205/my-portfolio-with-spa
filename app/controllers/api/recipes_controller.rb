class Api::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show edit update destroy]
  before_action :correct_user, only: %i[edit update destroy]

  def index
    @recipes = associate(Recipe.all)
    render json: @recipes
  end

  def show
    render json: associate(@recipe)
  end

  def new
  end

  def create
    @recipe = current_user.recipes.build(recipe_params)
    if params[:image]
      attach_image(@recipe)
    end

    if @recipe.save
      render json: { recipe: @recipe, status: :created }
    else
      render json: { errors: @recipe.errors, status: :unprocessable_entity }
    end
  end

  def edit
    render json: associate(@recipe)
  end

  def update
    if params[:image]
      attach_image(@recipe)
    end

    if @recipe.update(recipe_params)
      render json: { recipe: @recipe, status: :ok, message: "レシピの内容が更新されました", image: @recipe.image_url}
    else
      render json: { errors: @recipe.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    @recipe.destroy
    render json: { status: :ok, message: "レシピを削除しました"}
  end

  def search
    @recipes = json_with_image_and_user(Recipe.search(params[:keyword]))
    @keyword = params[:keyword]
    render json: {recipes: @recipes, keyword: @keyword}
  end

  def conditional_search
    cost = params[:cost]
    duration = params[:duration]
    if cost != "undefined" && duration != "undefined"
      @recipes = Recipe.where('cost <= ? and duration <= ?', cost, duration)
    else
      @recipes = Recipe.where('cost <= ? or duration <= ?', cost, duration)
    end
    render json: { recipes: associate(@recipes) }
  end

  private
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def recipe_params
      params.require(:recipe).permit(:title, :ingredient, :body, :image, :duration, :cost, :category_id)
    end

    def attach_image(recipe)
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(decode(params[:image][:data]) + "\n"),
        filename: params[:image][:filename]
        )
      recipe.image.attach(blob)
    end

    def decode(str)
      Base64.decode64(str.split(',').last)
    end

    def correct_user
      @user = @recipe.user
      render json: { status: :forbidden, message: '権限がありません' } unless current_user?(@user)
    end

    def associate(obj)
      JSON.parse(obj.to_json(include: [:category, {user: {methods: [:image_url]}}], methods: [:image_url]))
    end
end