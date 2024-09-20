Rails.application.routes.draw do
  root to: 'static_pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :services, only: [:create, :index, :show, :update, :destroy]
    resources :services, only: [:create, :index, :show, :update, :destroy]
    resources :tags, only: [:create, :index, :show, :update]

    #Sessions API
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions' => 'sessions#destroy'
  end
end
