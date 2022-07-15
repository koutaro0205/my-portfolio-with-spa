require 'rails_helper'

RSpec.describe "Users", type: :request do
  let!(:user) { FactoryBot.create(:user) }

  describe "GET /signup" do
    it "responds successfully" do
      get signup_path
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET /api/users' do
    it 'loads users' do
      log_in(user)
      get api_users_path
      users_json = JSON.parse(response.body)
      expect(response).to have_http_status(:success)
      expect(users_json["users"].length).to eq 1
    end

    context 'when you have not logged in' do
      it 'makes you inaccessible' do
        get api_users_path
        users_json = JSON.parse(response.body)
        expect(response).to have_http_status(:success)
        expect(users_json["status"]).to eq "forbidden"
      end
    end
  end

  describe 'GET /api/users/:id' do
    it 'loads a user' do
      log_in(user)
      user_id = user.id
      get api_user_path(user_id)
      expect(response).to have_http_status(:success)

      user_json = JSON.parse(response.body)
      expect(user_json["user"]["name"]).to eq "tester"
    end

    it 'does not allow non-enabled users to access' do
      not_activated_user = FactoryBot.create(:not_activated_user)
      log_in user
      get api_user_path(not_activated_user)
      user_json = JSON.parse(response.body)
      expect(user_json["status"]).to eq "forbidden"
    end

    it 'does not allow users who are not enabled to log in' do
      not_activated_user = FactoryBot.create(:not_activated_user)
      log_in not_activated_user
      user_json = JSON.parse(response.body)
      expect(user_json["status"]).to eq "unprocessable_entity"
    end
  end

  describe 'POST /users' do
    it "when the value is an invalid" do
      expect {
        post api_users_path, params: { user: { name: '',
                                            email: 'user@invlid',
                                            password: 'foo',
                                            password_confirmation: 'bar' } }
      }.to_not change(User, :count)
    end

    context 'when the value is invalid' do
      before do
        ActionMailer::Base.deliveries.clear
      end

      let(:user_params) {{ name: 'Example User',
                                    email: 'user@example.com',
                                    password: 'password',
                                    password_confirmation: 'password',
                                      }}

      it 'registers a user' do
        expect {
          post api_users_path, params: user_params
        }.to change(User, :count).by 1
        json = JSON.parse(response.body)
        expect(json["status"]).to eq "created"
      end

      it 'does not activate at registration' do
        post api_users_path, params: user_params
        expect(User.first).to_not be_activated
      end
    end
  end

  describe 'GET /api/users/:id/edit' do
    it 'loads a edit user' do
      log_in(user)
      user_id = user.id
      get edit_api_user_path(user_id)
      expect(response).to have_http_status(:success)

      edit_user_json = JSON.parse(response.body)
      expect(edit_user_json["status"]).to eq "ok"
    end

    context 'when you have not logged in' do
      it 'loads a edit user' do
        user_id = user.id
        get edit_api_user_path(user_id)
        expect(response).to have_http_status(:success)
        edit_user_json = JSON.parse(response.body)
        expect(edit_user_json["status"]).to eq "forbidden"
      end
    end

    context 'when you are other user' do
      let(:other_user) { FactoryBot.create(:user) }

      it 'empty the flash message' do
        log_in user
        get edit_api_user_path(other_user)
        edit_user_json = JSON.parse(response.body)
        expect(edit_user_json["status"]).to eq "forbidden"
      end

      it 'returns a status "forbidden"' do
        log_in user
        get edit_api_user_path(other_user)
        edit_user_json = JSON.parse(response.body)
        expect(edit_user_json["status"]).to eq "forbidden"
      end
    end
  end
end
