require 'rails_helper'

RSpec.describe Taggable, type: :model do
  context 'create' do
    it 'must belong to a service' do
      expect {
        user = FactoryBot.create(:user)
        tag = FactoryBot.create(:tag)
        Taggable.create!(
          tag_id: tag.id
        )
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must belong to a tag' do
      expect {
        user = FactoryBot.create(:user)
        service = FactoryBot.create(:service, user: user)
        Taggable.create!(
          service_id: service.id
        )
      }
    end

    it 'can only have on non-inflatable service' do
      expect {
        user = FactoryBot.create(:user)
        service = FactoryBot.create(:service, user: user)
        tag1 = FactoryBot.create(:tag, inflatable: false)
        tag2 = FactoryBot.create(:tag, english_name: "Combo", spanish_name: "Combo", inflatable: false)
        Taggable.create!(
          service_id: service.id,
          tag_id: tag1.id
        )
        Taggable.create!(
          service_id: service.id,
          tag_id: tag2.id
        )
    }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
