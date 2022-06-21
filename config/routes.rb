Rails.application.routes.draw do
  root to: 'site#index'

	get '/signup', to: 'site#index'
	get 'users', to: 'site#index'
	get 'users/new', to: 'site#index'
	get 'users/:id', to: 'site#index'
	get 'users/:id/edit', to: 'site#index'
  get '/login', to: 'site#index'
  get 'password_resets/new', to: 'site#index'
  get 'password_resets/:id/edit', to: 'site#index', as: 'edit_password_resets'
  get 'account_activations/:id/edit', to: 'site#index', as: 'edit_account_activations'

	namespace :api do
		resources :users, format: 'json'
    resources :password_resets, only: [:new, :create, :edit, :update], format: 'json'
    resources :account_activations, only: [:edit], format: 'json'

    post '/login', to: 'sessions#create', format: 'json'
    delete '/logout', to: 'sessions#destroy', format: 'json'
    get '/logged_in', to: 'sessions#logged_in?', format: 'json'
    get '/admin_user', to: 'users#admin_user?', format: 'json'
	end
  # get '/signup', to: 'users#new'
  # get '/login', to: 'sessions#new'
  # post '/login', to: 'sessions#create'
  # delete '/logout', to: 'sessions#destroy'
  # get '/search', to: 'recipes#search'
  # get '/short_time', to: 'recipes#short_time'
  # get '/low_cost', to: 'recipes#low_cost'
  # resources :users do
  #   member do
  #     get :following, :followers, :favorite_recipes, :interesting_questions
  #   end
  # end
  # resources :recipes do
  #   resources :comments, only: [:create, :destroy]
  #   collection do
  #     get :user_favorites, :following_user, :conditional_search
  #   end
  # end
  # resources :questions do
  #   resources :question_comments, only: [:create, :destroy]
  #   collection do
  #     get 'search'
  #   end
  # end
  # resources :account_activations, only: [:edit]
  # resources :password_resets, only: [:new, :create, :edit, :update]
  # resources :relationships, only: [:create, :destroy]
  # resources :favorites, only: [:create, :destroy]
  # resources :categories, except: [:new]
  # resources :interests, only: [:create, :destroy]
	
	# namespace :api do
	# 	resources :events, only: %i[index show create destroy update]
	# end
end
