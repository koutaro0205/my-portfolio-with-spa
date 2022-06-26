class Api::CommentsController < ApplicationController
  before_action :logged_in_user, only: %i[create destroy]
  before_action :correct_user, only: %i[destroy]
  before_action :get_recipe, only: %i[create, show_comments]

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: { status: :created, comment: json_with_user(@comment), message: "コメントが投稿されました" }
    else
      render json: { status: :unprocessable_entity, recipe: @recipe, message: "コメントの投稿に失敗しました" }
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      render json: { status: :ok, message: "コメントを削除しました" }
    else
      render json: { status: :unprocessable_entity, message: "コメントの削除に失敗しました" }
    end
  end

  def show_comments
    @comments = json_with_user(@recipe.comments.order(created_at: :desc))
    render json: { comments: @comments }
  end

  private
    def get_recipe
      @recipe = Recipe.find_by(id: params[:recipe_id])
    end

    def comment_params
      params.permit(:content).merge(user_id: current_user.id, recipe_id: params[:recipe_id])
    end

    def correct_user
      @comment = Comment.find(params[:id])
      render json: { status: :forbidden, message: '権限がありません'} unless @comment.user == current_user
    end
end