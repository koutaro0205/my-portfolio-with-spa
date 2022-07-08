class Api::CategoriesController < ApplicationController
  before_action :set_category, only: %i[show edit update destroy]
  before_action :admin_user, only: %i[create edit update destroy]

  def show
    @recipes = associate(@category.recipes)
    render json: { recipes: @recipes, category: @category }
  end

  def index
    @categories = Category.all
    render json: { categories: @categories }
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      render json: { status: :created, category: @category}
    else
      @categories = Category.all
      render json: { status: :unprocessable_entity, categories: JSON.parse(@categories) }
    end
  end

  def edit
    render json: { category: @category, status: :ok }
  end

  def update
    if @category.update(category_params)
      render json: { status: :ok, category: @category}
    else
      render json: { status: :unprocessable_entity, category: @category }
    end
  end

  def destroy
    @category.destroy
    render json: { status: :ok }
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.permit(:name)
    end

    def admin_user
      if current_user
        unless current_user.admin?
          render json: { user: current_user, admin: false }
        end
      end
    end

    def associate(obj)
      JSON.parse(obj.to_json(include: [:category, {user: {methods: [:image_url]}}], methods: [:image_url]))
    end
end