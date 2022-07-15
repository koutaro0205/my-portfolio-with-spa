require 'rails_helper'

RSpec.describe "Favorites", type: :request do
  let(:recipe_by_user1) {FactoryBot.create(:recipe_by_user1)}
  let(:recipe_by_user2) {FactoryBot.create(:recipe_by_user2)}
  let(:user1) {recipe_by_user1.user}

  describe 'POST /favorites #create' do
    context 'when you have logged in' do
      it 'increases your favorite recipe by one' do
        log_in user1
        expect {
          post api_favorites_path, params: { id: recipe_by_user2.id }
        }.to change(Favorite, :count).by 1
      end
    end
    context 'when you have not logged in' do
      it 'redirects to login page' do
        post api_favorites_path
        json = JSON.parse(response.body)
        expect(json["logged_in"]).to eq false
      end
      it 'cannot be registered' do
        expect {
          post api_favorites_path
        }.to_not change(Favorite, :count)
      end
    end
  end

  describe 'DELETE /favorite #destory' do
    context 'when you have logged in' do
      it 'decreases your favorite recipe by one' do
        log_in user1
        user1.favorite(recipe_by_user2)
        expect {
          delete api_favorite_path(recipe_by_user2)
        }.to change(Favorite, :count).by -1
      end

      it 'can also be registered with Ajax' do
        log_in user1
        user1.favorite(recipe_by_user2)
        expect {
          delete api_favorite_path(recipe_by_user2), xhr: true
        }.to change(Favorite, :count).by -1
      end
    end

    context 'when you have not logged in' do
      it 'returns a "logged_in: false"' do
        user1.favorite(recipe_by_user2)
        delete api_favorite_path(recipe_by_user2)
        json = JSON.parse(response.body)
        expect(json["logged_in"]).to eq false
      end

      it 'cannot be registered' do
        user1.favorite(recipe_by_user2)
        expect {
          delete api_favorite_path(recipe_by_user2)
        }.to_not change(Favorite, :count)
      end
    end
  end
end