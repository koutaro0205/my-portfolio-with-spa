module LoginSupport
  module Request
    def log_in(user)
      post api_login_path, params: { session: { email: user.email,
                                            password: user.password } }
    end

    def logged_in?
      !session[:user_id].nil?
    end
  end

  module System
    def log_in(user)
      visit root_path
      click_link "ログイン"
      fill_in 'メールアドレス', with: user.email
      fill_in 'パスワード', with: user.password
      click_button 'ログイン'
    end

    def to_user_path
      find('.dropdown__menu').click #open
      click_link '登録情報'
      find('.dropdown__menu').click #close
    end

    def post
      find('.form__btn').click
    end
  end
end

RSpec.configure do |config|
  config.include LoginSupport::System, type: :system
  config.include LoginSupport::Request, type: :request
end