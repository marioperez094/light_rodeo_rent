require 'rails_helper'

RSpec.describe 'Route definition', :type => :routing do
  it 'of POST /users' do
    expect(:post => '/api/users').to route_to(:controller => 'api/users', :action => 'create')
  end

  it 'of POST /sessions' do
    expect(:post => '/api/sessions').to route_to(:controller => 'api/sessions', :action => 'create')
  end

  it 'of DELETE /sessions' do
    expect(:delete => '/api/sessions').to route_to(:controller => 'api/sessions', :action => 'destroy')
  end

  it 'of GET /services' do
    expect(:get => '/api/services').to route_to(:controller => 'api/services', :action => 'index')
  end

  it 'of POST /services' do
    expect(:post => '/api/services').to route_to(:controller => 'api/services', :action => 'create')
  end

  it 'of GET /services/:id' do
    expect(:get => '/api/services/:id').to route_to(:controller => 'api/services', :action => 'show', :id => ':id')
  end

  it 'of PUT /services' do
    expect(:put => '/api/services/:id').to route_to(:controller => 'api/services', :action => 'update', :id => ':id')
  end
  
  it 'of DELETE /services/:id' do
    expect(:delete => '/api/services/:id').to route_to(:controller => 'api/services', :action => 'destroy', :id => ':id')
  end

  it 'of GET /tags' do
    expect(:get => '/api/tags').to route_to(:controller => 'api/tags', :action => 'index')
  end

  it 'of POST /tags' do
    expect(:post => '/api/tags').to route_to(:controller => 'api/tags', :action => 'create')
  end

  it 'of PUT /tags' do
    expect(:put => '/api/tags/:id').to route_to(:controller => 'api/tags', :action => 'update', :id => ':id')
  end

  it 'of POST /taggables' do
    expect(:post => '/api/taggables').to route_to(:controller => 'api/taggables', :action => 'create')
  end

  it 'of DELETE /taggables/:id' do
    expect(:delete => '/api/taggables/:id').to route_to(:controller => 'api/taggables', :action => 'destroy', :id => ':id')
  end
end