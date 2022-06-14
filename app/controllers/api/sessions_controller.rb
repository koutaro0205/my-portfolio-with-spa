class Api::SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      render json: { logged_in: true, user: user, status: :ok }
    else
      render json: { status: :unauthorized, errors: ['認証に失敗しました。正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
    end
  end

  def destroy
    log_out if !current_user.nil?
    render json: { status: :ok, logged_in: false }
  end

  def logged_in?
    if current_user
      render json: { user: current_user, logged_in: true }
    else
      render json: { logged_in: false, message: 'ユーザーが存在しません'}
    end
  end

end