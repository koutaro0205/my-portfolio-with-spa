require 'rails_helper'

RSpec.describe "Questions", type: :request do
  describe "GET /questions" do
    let!(:question){ FactoryBot.create(:question) }
    it "responds successfully" do
      get api_questions_path
      expect(response).to have_http_status(:success)
    end

    it 'loads questions' do
      get api_questions_path
      json = JSON.parse(response.body)
      expect(json["questions"].length).to eq 1
    end
  end

  describe "GET /questions/{id}" do
    let!(:question){ FactoryBot.create(:question) }
    it "responds successfully" do
      get api_question_path(question)
      expect(response).to have_http_status(:success)
    end

    it 'includes question title' do
      get api_question_path(question)
      json = JSON.parse(response.body)
      expect(json["question"]["title"]).to eq "質問タイトル"
    end
  end

  describe "GET /recipes/new" do
    context "when you have not logged in" do
      it 'cannot access' do
        get new_api_question_path
        json = JSON.parse(response.body)
        expect(json["logged_in"]).to eq false
      end
    end

    context "when you have logged in" do
      before do
        @user = FactoryBot.create(:user)
        log_in @user
      end

      it "responds successfully" do
        get new_api_question_path
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe 'POST /questions' do
    let(:question_params) { { question:
                              {
                                title: 'question title',
                                content: 'question content'
                              }
                            } }

    context 'when you have not logged in' do
      it 'does not register a question' do
        expect {
          post api_questions_path, params: question_params
        }.to_not change(Question, :count)
      end

      it 'returns "logged_in: false"' do
        post api_questions_path, params: question_params
        json = JSON.parse(response.body)
        expect(json["logged_in"]).to eq false
      end
    end

    context 'when you have already not logged in' do
      before do
        @user = FactoryBot.create(:user)
        log_in @user
      end

      it "can post questions" do
        expect {
          post api_questions_path, params: question_params
        }.to change(Question, :count).by 1
      end
    end
  end

  describe 'GET /questions/{id}/edit' do
    let!(:user) { FactoryBot.create(:user) }
    let!(:question) { FactoryBot.create(:question, user_id: user.id)}

    context "when you have not logged in" do
      it 'cannot access' do
        get edit_api_question_path(question)
        json = JSON.parse(response.body)
        expect(json["logged_in"]).to eq false
      end
    end

    context "when you have already logged in" do
      before do
        log_in user
      end

      it "responds successfully" do
        get edit_api_question_path(question)
        expect(response).to have_http_status(:success)
      end

      it "returns the appropriate json data" do
        get edit_api_question_path(question)
        json = JSON.parse(response.body)
        expect(json["question"]["title"]).to eq "質問タイトル"
      end

      it "does not let another user's question be edited" do
        other_user = FactoryBot.create(:other_user)
        other_question = FactoryBot.create(:question, user_id: other_user.id)
        get edit_api_question_path(other_question)
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "forbidden"
      end
    end
  end

  describe 'PATCH /question' do
    let!(:user) { FactoryBot.create(:user) }
    let!(:question) { FactoryBot.create(:question, user_id: user.id)}
    context 'when the value is invalid' do
      before do
        log_in user
        patch api_question_path(question), params: { question: {
          title: '',
          content: ''
          }
        }
      end

      it 'cannot update' do
        question.reload
        expect(question.title).to_not eq ''
        expect(question.content).to_not eq ''
      end

      it 'returns a status "unprocessable_entity"' do
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "unprocessable_entity"
      end
    end

    context 'when the value is valid' do
      before do
        log_in user
        @title = 'title'
        @content = 'content'
        patch api_question_path(question), params: { question: {
          title: @title,
          content: @content
          }
        }
      end

      it 'can update' do
        question.reload
        expect(question.title).to eq @title
        expect(question.content).to eq @content
      end

      it 'returns a status "ok"' do
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "ok"
      end
    end

    context 'when you have not logged in' do
      it 'returns "logged_in: false"' do
        patch api_question_path(question), params: { question: {
          title: 'title',
          content: 'content'
          }
        }
        json = JSON.parse(response.body)
        expect(json["logged_in"]).to eq false
      end
    end

    context 'when you update a question of other users' do
      let(:other_question) { FactoryBot.create(:other_question) }

      before do
        log_in user
      end

      it "does not let another user's question be updated" do
        patch api_question_path(other_question), params: { question: {
          title: 'title',
          content: 'content'
          }
        }
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "forbidden"
      end
    end
  end

  describe 'DELETE /questions/:id' do
    let!(:user) { FactoryBot.create(:user) }

    context 'when you delete users question' do
      let!(:question) {FactoryBot.create(:question, user_id: user.id)}
      before do
        log_in user
      end

      it 'can delete questions' do
        expect {
          delete api_question_path(question)
        }.to change(Question, :count).by -1
      end

      it 'returns a status "ok"' do
        delete api_question_path(question)
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "ok"
      end
    end

    context "when you try to delete another user's question" do
      before do
        log_in user
        @question = FactoryBot.create(:other_question)
      end

      it 'does not remove' do
        expect {
          delete api_question_path(@question)
        }.to_not change(Recipe, :count)
      end

      it "does not let another user's question be edited" do
        delete api_question_path(@question)
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "forbidden"
      end
    end

    context 'when you have not logged in' do
      before do
        @question = FactoryBot.create(:question)
      end

      it 'does not remove' do
        expect {
          delete api_question_path(@question)
        }.to_not change(Recipe, :count)
      end

      it 'returns "logged_in: false"' do
        delete api_question_path(@question)
        json = JSON.parse(response.body)
        expect(json["logged_in"]).to eq false
      end
    end
  end
end