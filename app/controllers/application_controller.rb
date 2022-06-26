class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  include SessionsHelper

  def json_with_image(obj)
    JSON.parse(obj.to_json(methods: [:image_url]))
  end

  def json_with_image_and_user(obj)
    JSON.parse(obj.to_json(include: {user: {methods: [:image_url]}}, methods: [:image_url]))
  end

  private
    def logged_in_user
      unless logged_in_now?
        render json: { logged_in: false, message: 'ユーザーが存在しません' }
      end
    end

    # def logged_in_user
    #   unless logged_in?
    #     session[:forwarding_url] = request.original_url if request.get?
    #     flash[:danger] = "ログインが必要です"
    #     redirect_to login_url
    #   end
    # end
end
