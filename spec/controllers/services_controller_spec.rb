require 'rails_helper'

RSpec.describe Api::ServicesController, type: :controller do
  render_views

  context 'GET /services' do
    it 'renders all services' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      service1 = FactoryBot.create(:service, user: user)
      service2 = FactoryBot.create(:service, user: user)

      get :index

      expect(response.body).to eq({
        services: [{
          id: service1.id,
          english_name: 'The Jacarandoso',
          spanish_name: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          spanish_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x13.5',
          tags: [],
          images: []
        }, {
          id: service2.id,
          english_name: 'The Jacarandoso',
          spanish_name: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          spanish_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x13.5',
          tags: [],
          images: []
        }]
    }.to_json)
    end

    it 'searches for a service' do 
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      service1 = FactoryBot.create(:service, user: user)
      service2 = FactoryBot.create(:service, dimensions: '18.5x18.5', user: user)

      get :show, params: { id: service2.id }

      expect(response.body).to eq({
        service: {
          id: service2.id,
          english_name: 'The Jacarandoso',
          spanish_name: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          spanish_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '18.5x18.5',
          tags: [],
          images: []
        }
      }.to_json)
    end
  end

  context 'POST /services' do
    it 'renders a new service' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      post :create, params: {
        service: {
          english_name: 'The Jacarandoso',
          spanish_name: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          spanish_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x13.5',
        }
      }

      expect(Service.count).to eq(1)

      expect(response.body).to eq({
        service: {
          id: 1,
          english_name: 'The Jacarandoso',
          spanish_name: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          spanish_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x13.5', 
          tags: [],
          images: []
        }
      }.to_json)
    end
  end

  context 'PUT /services/:id' do
    it 'updates services' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      service = FactoryBot.create(:service, user: user)

      post :update, params: { id: service.id, 
        service: {
          id: service.id,
          english_name: 'The Jacarandoso',
          spanish_name: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          spanish_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x14.5',
        }
      }

      expect(response.body).to eq({
        service: {
          id: 1,
          english_name: 'The Jacarandoso',
          spanish_name: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          spanish_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x14.5',
          tags: [],
          images: []
        }
      }.to_json)
    end
  end

  context 'GET /tags/:id/services' do
    it 'renders all services under a tag' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      tag1 = FactoryBot.create(:tag)
      tag2 = FactoryBot.create(:tag, english_name: 'Mechanical Bull', spanish_name: 'Toro Mecanico')

      service1 = FactoryBot.create(:service, user: user)
      service2 = FactoryBot.create(:service, user: user)
      service3 = FactoryBot.create(:service, user: user)

      taggable1 = FactoryBot.create(:taggable, service: service1, tag: tag1)
      taggable2 = FactoryBot.create(:taggable, service: service2, tag: tag2)
      taggable3 = FactoryBot.create(:taggable, service: service3, tag: tag1)

      get :index_by_tag, params: { id: tag1.id }

      expect(response.body).to eq({
        services: [{
          id: service1.id,
          english_name: service1.english_name,
          spanish_name: service1.spanish_name,
          english_description: service1.english_description,
          spanish_description: service1.spanish_description,
          dimensions: service1.dimensions,
          tags: [],
          images: []
        },{          
          id: service3.id,
          english_name: service3.english_name,
          spanish_name: service3.spanish_name,
          english_description: service3.english_description,
          spanish_description: service3.spanish_description,
          dimensions: service3.dimensions,
          tags: [],
          images: []
        }]
      }.to_json)
    end
  end

  context 'DELETE /services/:id' do
    it 'deletes a service' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      service = FactoryBot.create(:service, user: user)

      expect(Service.count).to eq(1)

      delete :destroy, params: { id: service.id }

      expect(Service.count).to eq(0)
    end
  end
end