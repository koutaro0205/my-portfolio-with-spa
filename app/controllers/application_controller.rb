class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  include SessionsHelper

  private

    # def logged_in_user
    #   unless logged_in?
    #     session[:forwarding_url] = request.original_url if request.get?
    #     flash[:danger] = "ログインが必要です"
    #     redirect_to login_url
    #   end
    # end
end
