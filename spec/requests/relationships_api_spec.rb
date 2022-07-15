require 'rails_helper'

RSpec.describe 'Relationships', type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:other_user) { FactoryBot.create(:other_user) }
  describe '#create' do
    it 'increases the number of users you are following by 1' do
      log_in user
      expect {
        post api_relationships_path, params: { id: other_user.id }
      }.to change(Relationship, :count).by 1
    end

    it 'can also be registered with Ajax' do
      log_in user
      expect {
        post api_relationships_path, params: { id: other_user.id }, xhr: true
      }.to change(Relationship, :count).by 1
    end

    context 'when you have not logged in' do
      it 'returns a "logged_in: false"' do
        post api_relationships_path
        json = JSON.parse(response.body)
        expect(json["logged_in"]).to eq false
      end

      it 'cannot be registered' do
        expect {
          post api_relationships_path
        }.to_not change(Relationship, :count)
      end
    end
  end

  describe '#destroy' do
    it 'decreases the number of users you are following by 1' do
      log_in user
      user.follow(other_user)
      expect {
        delete api_relationship_path(other_user)
      }.to change(Relationship, :count).by -1
    end
  end
end