Rails.application.routes.draw do
  
  root to: 'static_pages#home'

  #Home pages
  get '/service-type/:id' => 'static_pages#service_filter'
  get '/service/:id' => 'static_pages#service'
  get '/contact' => 'static_pages#contact'
  get '/contact/success' => 'static_pages#success'

  #Admin pages
  get '/admin' => 'static_pages#admin'
  get '/admin/login' => 'static_pages#login'
  get '/admin/service-list' => 'static_pages#admin_service_list'
  get '/admin/tags' => 'static_pages#admin_tags'
  get '/admin/service/:id' => 'static_pages#admin_service'
  get '/admin/homepage' => 'static_pages#admin_homepage'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :services, only: [:create, :index, :show, :update, :destroy]
    resources :tags, only: [:create, :index, :show, :update, :destroy]
    resources :taggables, only: [:create, :index, :destroy]
    resources :cards, only: [:create, :index, :show, :update]

    #Sessions API
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions' => 'sessions#destroy'

    #Services under a Tag
    get '/tags/:id/services' => 'services#index_by_tag'
    get '/services/tags' => 'services#index_tags'
    get '/services/search/service_tag' => 'services#index_service_tag'

    #Tags under a service
    get '/services/:id/tags' => 'tags#index_by_service'
    get '/services/:id/tags-in-services' => 'tags#all_tags_includes_service'

    #Tags
    get '/tags_with_image' => 'tags#tags_with_service_image'

    #Taggables
    delete '/taggables/:tag_id/:service_id' => 'taggables#destroy'
  end

  #Redirects react-router links on reload 
  get '/admin/service-list/*path' => redirect('/admin/service-list')
  get '/admin/service/:id/*path' => redirect('/admin/service/%{id}')
  get '/admin/homepage/*path' => redirect('/admin/homepage')
end
