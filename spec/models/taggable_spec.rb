require 'rails_helper'

RSpec.describe Taggable, type: :model do
  context 'create' do
    it 'must belong to a user' do
      expect {
        user = FactoryBot.create(:user)
        service = FactoryBot.create(:service)
        tag = FactoryBot.create(:tag)
        Taggable.create!(
          service: service,
          tag: tag
        )
      }
    end

    it 'must belong to a service' do
      expect {
        user = FactoryBot.create(:user)
        service = FactoryBot.create(:service)
        tag = FactoryBot.create(:tag)
        Taggable.create!(
          user: user,
          tag: tag
        )
      }
    end

    it 'must belong to a user' do
      expect {
        user = FactoryBot.create(:user)
        service = FactoryBot.create(:service)
        tag = FactoryBot.create(:tag)
        Taggable.create!(
          service: service,
          user: user
        )
      }
    end
  end
end
