Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/admin' => 'static_pages#admin'
  get '/admin/login' => 'static_pages#login'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :services, only: [:create, :index, :show, :update, :destroy]
    resources :services, only: [:create, :index, :show, :update, :destroy]
    resources :tags, only: [:create, :index, :show, :update]
    resources :taggables, only: [:create, :destroy]

    #Sessions API
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions' => 'sessions#destroy'

    #Services under a Tag
    get '/tags/:id/services' => 'services#index_by_tag'

    #Tags under a service
    get '/services/:id/tags' => 'tags#index_by_service'
  end
end
