require 'rails_helper'

RSpec.describe Api::TagsController, type: :controller do
  render_views

  context 'GET /tags' do
    it 'renders all types' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token
      
      tag1 = FactoryBot.create(:tag)
      tag2 = FactoryBot.create(:tag, english_name: 'Combo', nombre_espanol: 'Combo')

      get :index

      expect(response.body).to eq({
        tags: [{
          id: tag1.id,
          english_name: 'Themed',
          nombre_espanol: 'Tematico'
        },
        {
          id: tag2.id,
          english_name: 'Combo',
          nombre_espanol: 'Combo'
        }]
      }.to_json)
    end

    it 'searches for a type' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token
      
      tag1 = FactoryBot.create(:tag)
      tag2 = FactoryBot.create(:tag, english_name: 'Combo', nombre_espanol: 'Combo')

      get :show, params: { id: tag2.id }

      expect(response.body).to eq({
        tag: {
          id: tag2.id,
          english_name: 'Combo',
          nombre_espanol: 'Combo'
        }
      }.to_json)
    end
  end

  context 'POST /tags' do
    it 'renders a new tag' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      post :create, params: {
        tag: {
          english_name: 'Themed',
          nombre_espanol: 'Tematico'
        }
      }

      expect(Tag.count).to eq(1)
      
      expect(response.body).to eq({
        tag: {
          id: 1,
          english_name: 'Themed',
          nombre_espanol: 'Tematico'
        }
      }.to_json)
    end
  end

  context 'PUT /tags/:id' do
    it 'updates types' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      tag = FactoryBot.create(:tag)

      post :update, params: { id: tag.id,
        tag: {
          id: tag.id,
          english_name: 'Combo',
          nombre_espanol: 'Combo'
        }
      }

      expect(response.body).to eq({
        tag: {
          id: 1,
          english_name: 'Combo',
          nombre_espanol: 'Combo'
        }
      }.to_json)
    end
  end

  context 'GET /services/:id/tags' do
    it 'renders all tags under a service' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      tag1 = FactoryBot.create(:tag)
      tag2 = FactoryBot.create(:tag, english_name: 'Mechanical Bull', nombre_espanol: 'Toro Mecanico')
      tag3 = FactoryBot.create(:tag, english_name: 'Obstacles', nombre_espanol: 'Obstaculos')

      service1 = FactoryBot.create(:service, user: user)
      service2 = FactoryBot.create(:service, user: user)
      service3 = FactoryBot.create(:service, user: user)

      taggable1 = FactoryBot.create(:taggable, service: service1, tag: tag1)
      taggable3 = FactoryBot.create(:taggable, service: service2, tag: tag3)
      taggable3 = FactoryBot.create(:taggable, service: service1, tag: tag2)

      get :index_by_service, params: { id: service1.id }

      expect(response.body).to eq({
        tags: [{
          id: tag1.id,
          english_name: tag1.english_name,
          nombre_espanol: tag1.nombre_espanol
        }, {
          id: tag2.id,
          english_name: tag2.english_name,
          nombre_espanol: tag2.nombre_espanol
        }]
      }.to_json)
    end
  end
end