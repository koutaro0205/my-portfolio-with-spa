class Api::UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]
  before_action :correct_user, only: %i[edit update]

  def index
    @users = User.all
    render json: @users, methods: [:image_url]
  end

  def show
    @recipes = @user.recipes.to_json(include: {user: {methods: [:image_url]}}, methods: [:image_url])
    user = @user.to_json(methods: [:image_url])
    recipes_count = @user.recipes.count
    render json: { recipes: JSON.parse(@recipes), user: JSON.parse(user), recipes_count: recipes_count}
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