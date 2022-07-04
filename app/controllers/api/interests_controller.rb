class Api::InterestsController < ApplicationController
  before_action :logged_in_user

  def create
    @question = Question.find(params[:id])
    current_user.interested_in(@question)
    render json: { status: :ok, question: @question }
  end

  def destroy
    @interest = current_user.interests.find_by(question_id: params[:id])
    @question = @interest.question
    current_user.not_interested_in(@question)
    render json: { status: :ok, question: @question }
  end
end