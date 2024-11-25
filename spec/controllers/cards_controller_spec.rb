require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  render_views

  context 'GET /cards' do
    it 'renders all cards' do      
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      tag1 = FactoryBot.create(:tag)
      tag2 = FactoryBot.create(:tag, english_name: "Combo", spanish_name: "combo")

      card1 = FactoryBot.create(:card, tag: tag1)
      card2 = FactoryBot.create(:card, tag: tag2)

      get :index

      expect(response.body).to eq({
        cards: [{
          id: card1.id,
          tag_id: tag1.id,
          english_name: tag1.english_name,
          spanish_name: tag1.spanish_name,
          isCarousel: card1.isCarousel,
          image_url: card1.image_url
        }, {
          id: card2.id,
          tag_id: tag2.id,
          english_name: tag2.english_name,
          spanish_name: tag2.spanish_name,
          isCarousel: card2.isCarousel,
          image_url: card2.image_url
        }]
      }.to_json)
    end

    
    it 'searches for a card' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      tag1 = FactoryBot.create(:tag)
      tag2 = FactoryBot.create(:tag, english_name: "Combo", spanish_name: "combo")

      card1 = FactoryBot.create(:card, tag: tag1)
      card2 = FactoryBot.create(:card, tag: tag2)

      get :show, params: { id: card2.id }

      expect(response.body).to eq({
        card: {
          id: card2.id,
          tag_id: tag2.id,
          english_name: tag2.english_name,
          spanish_name: tag2.spanish_name,
          isCarousel: card2.isCarousel,
          image_url: card2.image_url
        }
      }.to_json)
    end
  end

  context 'POST /cards' do
    it 'renders a new card' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token
    
      tag1 = FactoryBot.create(:tag)

      post :create, params: {
        card: {
          tag_id: tag1.id,
          isCarousel: false,
          image_url: "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--80c164eb01c8dbe8fe41dc970bf3eba6b7632567/Inflatable.jpg"
        }
      }

      expect(Card.count).to eq(1)

      expect(response.body).to eq({
        card: {
          id: 1,
          tag_id: tag1.id,
          english_name: tag1.english_name,
          spanish_name: tag1.spanish_name,
          isCarousel: false,
          image_url: "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--80c164eb01c8dbe8fe41dc970bf3eba6b7632567/Inflatable.jpg"
        }
      }.to_json)
    end
  end

  context 'PUT /cards/:id' do
    it 'updates cards' do
      user = FactoryBot.create(:user)
      session = user.sessions.create
      @request.cookie_jar.signed['light_rodeo_session_token'] = session.token

      tag1 = FactoryBot.create(:tag)
      tag2 = FactoryBot.create(:tag, english_name: "Combo", spanish_name: "Combo")
      card1 = FactoryBot.create(:card, tag: tag1)

      post :update, params: { id: card1.id, 
        card: {
          id: card1.id,
          tag_id: tag2.id,
          isCarousel: true, 
          image_url: "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--80c164eb01c8dbe8fe41dc970bf3eba6b7632567/Inflatable.jpg"
        }
      }
    end
  end
end