require 'rails_helper'
 
RSpec.describe "Sessions", type: :request do
  describe "GET /login" do
    it "returns http success" do
      get login_path
      expect(response).to be_successful
    end
  end

  describe "POST /login" do
    it "can log in" do
      user = FactoryBot.create(:user)
      post api_login_path, params: { session: { email: user.email, password: user.password } }
      expect(logged_in?).to be_truthy
    end
  end

  describe 'DELETE /logout' do
    before do
      user = FactoryBot.create(:user)
      post api_login_path, params: { session: { email: user.email, password: user.password } }
    end

    it 'can log out' do
      expect(logged_in?).to be_truthy
      delete api_logout_path
      expect(logged_in?).to_not be_truthy
    end

    it 'is valid even if you log out twice in a row' do
      delete api_logout_path
      delete api_logout_path
      json = JSON.parse(response.body)
      expect(json["logged_in"]).to eq false
    end
  end

  describe '#create' do
    let(:user) { FactoryBot.create(:user) }

    describe 'remember me' do
      it 'cookies[:remember_token] is not empty if ON' do
        post api_login_path, params: { session: { email: user.email,
                                                  password: user.password,
                                                  remember_me: true } }
        expect(cookies[:remember_token]).to_not be_blank
      end
    end
  end
end