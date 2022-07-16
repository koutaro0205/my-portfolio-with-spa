require 'rails_helper'

RSpec.describe "Recipes", type: :system, js: true do
  describe 'Users#show' do
    before do
      FactoryBot.send(:user_with_posts, posts_count: 15)
      FactoryBot.send(:category)
      @user = Recipe.first.user
      @user.password = 'password'
      log_in @user
      to_user_path
    end

    it 'displays 12(perpage) recipes' do
      posts_wrapper =
        within 'ul.recipes' do
          find_all('li')
        end
      expect(posts_wrapper.size).to eq 12
    end

    it 'displays the pagination wrapper tag' do
      expect(page).to have_selector 'ul.pagination'
    end

    it 'only displays pagination in one place' do
      pagination = find_all('ul.pagination')
      expect(pagination.size).to eq 1
    end

    it 'displays 投稿数 15' do
      expect(page).to have_content '投稿数 15'
    end
  end

  describe 'recipes#index' do
    it 'displays the pagination wrapper tag' do
      FactoryBot.send(:user_with_posts, posts_count: 15)
      user = Recipe.first.user
      log_in user
      visit recipes_path
      expect(page).to have_selector 'ul.pagination'
    end
  end

  describe 'recipes#create' do
    let!(:category){ FactoryBot.create(:category) }
    context 'when an valid transmission is made' do
      it 'can post' do
        user = FactoryBot.create(:user)
        log_in user
        visit '/recipes/new'
        expect {
          fill_in 'レシピタイトル', with: 'レシピタイトル'
          fill_in '材料', with: '材料'
          fill_in '所要時間(分)', with: 10
          fill_in '値段(円)', with: 300
          select 'カテゴリ名', from: 'category_id'
          find('.form__btn').click
        }.to change(Recipe, :count).by 1

        expect(page).to have_content 'レシピタイトル'
      end
    end

    context 'when an invalid transmission is made' do
      it 'does not post if title, material, time, price is empty' do
        user = FactoryBot.create(:user)
        log_in user
        visit '/recipes/new'
        fill_in 'レシピタイトル', with: ''
        fill_in '材料', with: '材料'
        fill_in '所要時間(分)', with: 10
        fill_in '値段(円)', with: 300
        select 'カテゴリ名', from: 'category_id'
        post
        expect(page).to have_selector 'div.error_explanation'

        visit '/recipes/new'
        fill_in 'レシピタイトル', with: 'レシピタイトル'
        fill_in '材料', with: ''
        fill_in '所要時間(分)', with: 10
        fill_in '値段(円)', with: 300
        select 'カテゴリ名', from: 'category_id'
        post
        expect(page).to have_selector 'div.error_explanation'

        visit '/recipes/new'
        fill_in 'レシピタイトル', with: 'レシピタイトル'
        fill_in '材料', with: ''
        fill_in '所要時間(分)', with: ''
        fill_in '値段(円)', with: 300
        select 'カテゴリ名', from: 'category_id'
        post
        expect(page).to have_selector 'div.error_explanation'

        visit '/recipes/new'
        fill_in 'レシピタイトル', with: 'レシピタイトル'
        fill_in '材料', with: ''
        fill_in '所要時間(分)', with: 10
        fill_in '値段(円)', with: ''
        select 'カテゴリ名', from: 'category_id'
        post
        expect(page).to have_selector 'div.error_explanation'
      end
    end

    it 'can attach an image' do
      user = FactoryBot.create(:user)
      log_in user
      visit '/recipes/new'
      expect {
        fill_in 'レシピタイトル', with: 'レシピタイトル'
        fill_in '材料', with: '材料'
        fill_in '所要時間(分)', with: 10
        fill_in '値段(円)', with: 300
        select 'カテゴリ名', from: 'category_id'
        attach_file "image", "#{Rails.root}/spec/files/sample.jpg"
        post
      }.to change(Recipe, :count).by 1

      attached_post = Recipe.first
      expect(attached_post.image).to be_attached
    end
  end
end
