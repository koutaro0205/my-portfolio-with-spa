Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'http://localhost:3000'

        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head],
            credentials: true
    end

    #本番環境用のオリジン設定
    allow do
        origins 'https://testapp235722.herokuapp.com'

        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head],
            credentials: true
    end

    allow do
        origins 'http://18.178.22.221'

        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head],
            credentials: true
    end
end