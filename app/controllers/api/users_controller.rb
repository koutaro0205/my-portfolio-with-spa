class Api::UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]
  before_action :correct_user, only: %i[edit update]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      render json: { user: @user, logged_in: true, status: :created }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def edit
    render json: { status: :ok, user: @user}
  end

  def update
    if @user.update(user_params)
      render json: { user: @user, status: :ok, message: "ユーザー情報が更新されました" }
    else
      render json: { user: @user.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    @user.destroy
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end

    def correct_user
      @checked_user = User.find_by(id: params[:id])
      unless current_user?(@checked_user)
        render json: { status: :forbidden, message: '権限がありません'}
      end
    end
end