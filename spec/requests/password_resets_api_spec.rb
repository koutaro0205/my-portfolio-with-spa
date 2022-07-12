require 'rails_helper'

RSpec.describe "PasswordResets", type: :request do
  let(:user) { FactoryBot.create(:user) }

  before do
    ActionMailer::Base.deliveries.clear
  end

  describe '#new' do
    it 'response successfully' do
      get password_resets_new_path
      expect(response).to have_http_status(:success)
    end
  end

  describe '#create' do
    it 'displays a flash message when it is an invalid email address' do
      post api_password_resets_path, params: { password_reset: { email: '' } }
      json = JSON.parse(response.body)
      expect(json["status"]).to eq "unprocessable_entity"
    end

    context 'when it is an valid email address' do
      it 'changes reset_digest' do
        post api_password_resets_path, params: { password_reset: { email: user.email } }
        expect(user.reset_digest).to_not eq user.reload.reset_digest
      end

      it 'returns the appropriate json data' do
        post api_password_resets_path, params: { password_reset: { email: user.email } }
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "ok"
      end
    end
  end

  describe '#edit' do
    before do
      post api_password_resets_path, params: { password_reset: { email: user.email } }
      @user = controller.instance_variable_get('@user')
    end

    it 'responds successfully if it has both an email address and a token valid' do
      get edit_api_password_reset_path(@user.reset_token, email: @user.email)
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["status"]).to eq "ok"
    end

    it 'returns a status "unprocessable_entity" if it is an invalid token' do
      get edit_api_password_reset_path('wrong token', email: @user.email)
      json = JSON.parse(response.body)
      expect(json["status"]).to eq "unprocessable_entity"
    end

    it 'redirects to new password_reset path' do
      @user.update_attribute(:reset_sent_at, 3.hours.ago)
      get edit_api_password_reset_path(@user.reset_token, email: @user.email)
      json = JSON.parse(response.body)
      expect(json["message"]).to eq "再設定されたパスワードの有効期限が切れました"
    end
  end

  describe '#update' do
    before do
      post api_password_resets_path, params: { password_reset: { email: user.email } }
      @user = controller.instance_variable_get('@user')
    end

    it 'inclides an error message if the password and confirmation is incorrect' do
      patch api_password_reset_path(@user.reset_token), params: { email: @user.email,
                                                              password: 'foobaz',
                                                              password_confirmation: 'barquux' }
      json = JSON.parse(response.body)
      expect(json["status"]).to eq "unprocessable_entity"
    end

    context 'when the pasword is valid' do
      before do
        patch api_password_reset_path(@user.reset_token), params: { email: @user.email,
                                                                    password: 'foobaz',
                                                                    assword_confirmation: 'foobaz' }
      end

      it 'puts you logged in' do
        expect(logged_in?).to be_truthy
      end

      it 'returns the appropriate json data' do
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "ok"
      end

      it 'makes reset_digest nil' do
        @user.reload
        expect(@user.reset_digest).to be_nil
      end
    end

    context 'when more than 2 hours have passed' do
      before do
        @user.update_attribute(:reset_sent_at, 3.hours.ago)
        patch api_password_reset_path(@user.reset_token), params: { email: @user.email,
                                                                    password: 'foobaz',
                                                                    assword_confirmation: 'foobaz' }
      end

      it 'returns an error message in json data' do
        json = JSON.parse(response.body)
        expect(json["message"]).to eq "再設定されたパスワードの有効期限が切れました"
      end
    end
  end
end