class Api::AccountActivationsController < ApplicationController
  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
      user.activate
      log_in user
      render json: { status: :ok, user: associate(user), logged_in: true, activated: true }
    else
      render json: { status: :unprocessable_entity, message: "無効な有効化リンクです" }
    end
  end

  private
  def associate(obj)
    JSON.parse(obj.to_json(methods: [:image_url], include: [:questions, { recipes: { methods: [:image_url] } }] ) )
  end
end