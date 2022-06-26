class Api::SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      if user.activated?
        log_in user
        params[:session][:remember_me] ? remember(user) : forget(user)
        render json: { logged_in: true, user: user, status: :ok, activated: true }
      else
        render json: { logged_in: false, status: :unprocessable_entity, activated: false, message: "アカウントが有効化されていません。メールに記載されている有効化リンクを確認して下さい。" }
      end
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
      recipes_count = current_user.recipes.count
      render json: { user: json_with_image(current_user), logged_in: true, recipes_count: recipes_count }
    else
      render json: { logged_in: false, message: 'ユーザーが存在しません' }
    end
  end

end