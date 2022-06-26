class Api::RelationshipsController < ApplicationController
  def create
    @user = User.find(params[:id])
    current_user.follow(@user)
    render json: { user: @user }
  end

  def destroy
    @active_relationship = current_user.active_relationships.find_by(followed_id: params[:id])
    @user = @active_relationship.followed
    current_user.unfollow(@user)
    render json: { user: @user }
  end
end