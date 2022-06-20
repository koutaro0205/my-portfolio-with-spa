class Api::PasswordResetsController < ApplicationController
  before_action :get_user,   only: %i[edit update]
  before_action :valid_user, only: %i[edit update]
  before_action :check_expiration, only: %i[edit update]

  def new
  end

  def create
    @user = User.find_by(email: params[:password_reset][:email].downcase)
    if @user
      @user.create_reset_digest
      @user.send_password_reset_email
      render json: { user: @user, status: :ok, message: "メールを送信しました。記載された手順に従ってパスワードの再設定を行なってください" }
    else
      render json: { user: @user, status: :unprocessable_entity, error: "登録されているメールアドレスが見つかりません" }
    end
  end

  def edit
  end

  def update
    if params[:password].empty?
      @user.errors.add(:password, :blank)
      render json: { status: :unprocessable_entity, user: @user, errors: @user.errors }
    elsif @user.update(user_params)
      log_in @user
      @user.update_attribute(:reset_digest, nil)
      render json: { status: :ok, user: @user, logged_in: true}
    else
      render json: { status: :unprocessable_entity, user: @user }
    end
  end

  def check_expiration
    if @user.password_reset_expired?
      render json: { status: :unprocessable_entity, to: 'password_resets/new', message: "再設定されたパスワードの有効期限が切れました"}
    end
  end

  private
    def get_user
      @user = User.find_by(email: params[:email])
    end

    def valid_user
      render json: { status: :unprocessable_entity } unless @user && @user.authenticated?(:reset, params[:id])
    end

    def user_params
      params.permit(:password, :password_confirmation)
    end
end