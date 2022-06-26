class Api::UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy follow_status following followers]
  before_action :correct_user, only: %i[edit update]
  before_action :logged_in_user, only: %i[follow_status]

  def index
    @users = User.all
    render json: @users, methods: [:image_url]
  end

  def show
    @recipes = json_with_image_and_user(@user.recipes)
    user = json_with_image(@user)
    recipes_count = @user.recipes.count
    render json: { recipes: @recipes, user: user, recipes_count: recipes_count}
  end

  def create
    @user = User.new(user_params)
    if params[:image]
      attach_image(@user)
    end

    if @user.save
      @user.send_activation_email
      render json: { user: @user, message: "アカウントの有効化を行うため、メールをご確認ください" }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def edit
    render json: { status: :ok, user: @user, image: @user.image_url}
  end

  def update
    if params[:image]
      attach_image(@user)
    end

    if @user.update(user_params)
      render json: { user: @user, status: :ok, message: "ユーザー情報が更新されました", image: @user.image_url}
    else
      render json: { user: @user.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    if current_user.admin?
      @user.destroy
      render json: { status: :ok}
    else
      render json: { status: :forbidden, message: '権限がありません' }
    end
  end

  def following
    @title = "フォロー中"
    user_json = json_with_image(@user)
    @users = @user.following
    users_json = json_with_image(@users)
    following_count = @user.following.count
    recipes_count = @user.recipes.count
    render json: { title: @title, following_count: following_count, recipes_count: recipes_count,
                    user: user_json, users: users_json}
  end

  def followers
    @title = "フォロワー"
    user_json = json_with_image(@user)
    @users = @user.followers
    users_json = json_with_image(@users)
    followers_count = @user.followers.count
    recipes_count = @user.recipes.count
    render json: { title: @title, followers_count: followers_count, recipes_count: recipes_count,
                    user: user_json, users: users_json}
  end

  def follow_status
    if current_user.following?(@user)
      render json: { following: true }
    else
      render json: { following: false }
    end
  end

  def favorite_status
    @recipe = Recipe.find(params[:id])
    if current_user.favorite?(@recipe)
      render json: { favorite: true }
    else
      render json: { favorite: false }
    end
  end

  def admin_user?
    if current_user
      if current_user.admin?
        render json: { user: current_user, admin: true }
      else
        render json: { user: current_user, admin: false }
      end
    else
      render json: { logged_in: false, message: 'ユーザーが存在しません' }
    end
  end

  def favorite_recipes
    @title = "あなたのお気に入りレシピ"
    @favorite_recipes = json_with_image_and_user(current_user.favorite_recipes)
    render json: { favorite_recipes: @favorite_recipes, title: @title }
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def attach_image(user)
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(decode(params[:image][:data]) + "\n"),
        filename: params[:image][:filename]
        )
      user.image.attach(blob)
    end

    def user_params
      params.permit(:name, :email, :password, :password_confirmation, :image)
    end

    def decode(str)
      Base64.decode64(str.split(',').last)
    end

    def correct_user
      @checked_user = User.find_by(id: params[:id])
      unless current_user?(@checked_user)
        render json: { status: :forbidden, message: '権限がありません'}
      end
    end
end