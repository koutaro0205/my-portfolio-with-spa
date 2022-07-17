if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_auth-app-api', domain: '18.178.22.221'
else
  Rails.application.config.session_store :cookie_store, key: '_auth-app-api'
end