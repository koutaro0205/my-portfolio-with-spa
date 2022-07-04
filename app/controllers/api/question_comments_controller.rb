class Api::QuestionCommentsController < ApplicationController
  before_action :logged_in_user, only: %i[create destroy]
  before_action :correct_user, only: %i[destroy]
  before_action :set_question, only: %i[create index]

  def create
    @question_comment =  @question.question_comments.build(question_comment_params)
    if @question_comment.save
      render json: { status: :created, question_comment: associate(@question_comment), message: "コメントが投稿されました" }
    else
      render json: { status: :unprocessable_entity, question: @question, message: "コメントの投稿に失敗しました" }
    end
  end

  def destroy
    @question_comment = QuestionComment.find(params[:id])
    if @question_comment.destroy
      render json: { status: :ok, message: "コメントを削除しました", question_comment: @question_comment }
    else
      render json: { status: :unprocessable_entity, message: "コメントの削除に失敗しました" }
    end
  end

  def index
    @question_comments = associate(@question.question_comments.order(created_at: :desc))
    @question_comments_count = @question.question_comments.count
    render json: { question_comments: @question_comments, question_comments_count: @question_comments_count }
  end

  private
    def set_question
      @question = Question.find_by(id: params[:question_id])
    end

    def question_comment_params
      params.require(:question_comment).permit(:content).merge(user_id: current_user.id, question_id: params[:id])
    end

    def correct_user
      @question_comment = QuestionComment.find(params[:id])
      redirect_to(questions_path) unless @question_comment.user == current_user
    end

    def associate(obj)
      JSON.parse(obj.to_json(include: {user: {methods: [:image_url]}}))
    end
end