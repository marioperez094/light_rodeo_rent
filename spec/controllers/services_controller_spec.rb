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
          nombre_espanol: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          descripcion_espanol: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x13.5',
          service_type: 'Mechanical Bull'
        }, {
          id: service2.id,
          english_name: 'The Jacarandoso',
          nombre_espanol: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          descripcion_espanol: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x13.5',
          service_type: 'Mechanical Bull'
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
          nombre_espanol: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          descripcion_espanol: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '18.5x18.5',
          service_type: 'Mechanical Bull'
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
          nombre_espanol: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          descripcion_espanol: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x13.5',
          service_type: 'Mechanical Bull'
        }
      }

      expect(Service.count).to eq(1)

      expect(response.body).to eq({
        service: {
          id: 1,
          english_name: 'The Jacarandoso',
          nombre_espanol: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          descripcion_espanol: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x13.5', 
          service_type: 'Mechanical Bull'
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
          nombre_espanol: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          descripcion_espanol: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x14.5',
          service_type: 'Mechanical Bull'
        }
      }

      expect(response.body).to eq({
        service: {
          id: 1,
          english_name: 'The Jacarandoso',
          nombre_espanol: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          descripcion_espanol: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5x14.5',
          service_type: 'Mechanical Bull'
        }
      }.to_json)
    end
  end
end