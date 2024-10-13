Rails.application.routes.draw do
  root to: 'static_pages#home'

  #Admin pages
  get '/admin' => 'static_pages#admin'
  get '/admin/login' => 'static_pages#login'
  get '/admin/servicelist' => 'static_pages#admin_services'
  get '/admin/tags' => 'static_pages#admin_tags'
  get '/admin/service/:id' => 'static_pages#admin_service'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :services, only: [:create, :index, :show, :update, :destroy]
    resources :tags, only: [:create, :index, :show, :destroy]
    resources :taggables, only: [:create, :index, :destroy]

    #Sessions API
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions' => 'sessions#destroy'

    #Services under a Tag
    get '/tags/:id/services' => 'services#index_by_tag'

    #Tags under a service
    get '/services/:id/tags' => 'tags#index_all_and_belongs'

    #Taggables
    delete '/taggables/:tag_id/:service_id' => 'taggables#destroy'
  end

  #Redirects react-router links on reload 
  get "/admin/servicelist/*path" => redirect('/admin/servicelist')
  get "/admin/service/:id/*path" => redirect('/admin/service/%{id}')
end
