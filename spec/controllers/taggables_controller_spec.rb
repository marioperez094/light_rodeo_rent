require 'rails_helper'

RSpec.describe Api::TaggablesController, type: :controller do
  render_views

  context 'POST /taggables' do
    it 'renders merges a tag and a service' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      tag = FactoryBot.create(:tag)
      service = FactoryBot.create(:service, user: user)

      post :create, params: {
        taggable: {
          service_id: service.id,
          tag_id: tag.id
        }
      }

      expect(response.body).to eq({
        taggable: {
          id: 1,
          service_id: service.id,
          tag_id: tag.id,
          service: {
            id: service.id,
            english_name: service.english_name,
            nombre_espanol: service.nombre_espanol
          },
          tag: {
            id: tag.id,
            english_name: tag.english_name,
            nombre_espanol: tag.nombre_espanol
          }
        }
      }.to_json)
    end
  end

  context 'DELETE /taggables/:id' do
    it 'deletes a taggable' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      tag = FactoryBot.create(:tag)
      service = FactoryBot.create(:service, user: user)
      taggable = FactoryBot.create(:taggable, service: service, tag: tag)

      expect(Taggable.count).to eq(1)

      delete :destroy, params: { id: taggable.id }

      expect(Taggable.count).to eq(0)
    end
  end
end