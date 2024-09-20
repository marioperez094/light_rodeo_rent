require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  render_views

  context 'POST /users' do
    it 'renders new user object' do
      post :create, params: {
        user: {
          password: 'asdasdasd',
          username: 'test',
        }
      }

      expect(response.body).to eq({
        user: {
          username: 'test',
        }
      }.to_json)
    end
  end
end