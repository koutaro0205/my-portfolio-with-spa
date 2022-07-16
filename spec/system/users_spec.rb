require 'rails_helper'

RSpec.describe "Users", type: :system, js: true do
  describe '#create' do
    context 'when the value is invalid' do
      it 'displays area for error messages draws', js: true do
        visit root_path
        click_link "新規登録"
        fill_in '名前', with: ''
        fill_in 'メールアドレス', with: 'tester@invlid'
        fill_in 'パスワード', with: 'inv'
        fill_in 'パスワード確認', with: 'inv'
        click_button 'ユーザー登録'

        expect(page).to have_selector 'div.error_explanation'
      end
    end
  end

  describe '#index' do
    let!(:admin) { FactoryBot.create(:user) }
    let!(:not_admin) { FactoryBot.create(:other_user) }

    it 'displays a delete link if it is an admin user' do
      log_in admin
      visit users_path
      expect(page).to have_selector 'div.user__delete'
    end

    it 'does not show the delete link unless it is an admin user' do
      log_in not_admin
      visit users_path
      expect(page).to_not have_selector 'div.user__delete'
    end
  end

  describe '#edit' do
    it 'can attach an image' do
      user = FactoryBot.create(:user)
      log_in user
      find('.dropdown__menu').click
      click_link 'ユーザー編集'

      attach_file "image", "#{Rails.root}/spec/files/sample.jpg"
      find('.form__btn').click
      expect(page).to have_content 'ユーザー情報'
    end
  end
end