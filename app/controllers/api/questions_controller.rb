class Api::QuestionsController < ApplicationController
  before_action :logged_in_user, only: %i[new create edit update destroy]
  before_action :set_question, only: %i[show edit update destroy]
  before_action :correct_user, only: %i[edit update destroy]

  def index
    @questions = associate(Question.all)
    render json: {questions: @questions}
  end

  def show
    @question_comment_count = @question.question_comments.count
    @user = @question.user
    render json: { user: @user, question: associate(@question), question_comment_count: @question_comment_count }
  end

  def create
    @question = current_user.questions.build(question_params)
    if @question.save
      render json: { status: :created, question: associate(@question)}
    else
      render json: { status: :unprocessable_entity, errors: @question.errors }
    end
  end

  def edit
    @user = @question.user
    render json: { user: @user, question: @question }
  end

  def update
    if @question.update(question_params)
      render json: { question: associate(@question), status: :ok, message: "質問の内容が更新されました"}
    else
      render json: { status: :unprocessable_entity, errors: @question.errors }
    end
  end

  def destroy
    if @question.destroy
      render json: { status: :ok }
    end
  end

  def search
    @questions = Question.search(params[:keyword])
    @keyword = params[:keyword]
    render json: { questions: associate(@questions), keyword: @keyword}
  end

  private
    def set_question
      @question = Question.find(params[:id])
    end

    def question_params
      params.require(:question).permit(:title, :content)
    end

    def correct_user
      @user = @question.user
      render json: { status: :forbidden, message: '権限がありません' } unless current_user?(@user)
    end

    def associate(obj)
      # JSON.parse(obj.to_json(include: {user: {methods: [:image_url]}}))
      JSON.parse(obj.to_json(include: [:interests, :question_comments, {user: {methods: [:image_url]}}]))
    end
end