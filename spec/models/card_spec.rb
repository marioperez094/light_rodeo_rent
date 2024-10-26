require 'rails_helper'

RSpec.describe Card, type: :model do
  context 'create' do
    it 'should have an image_url' do
      expect {
        tag = FactoryBot.create(:tag)
        FactoryBot.create(:card, tag: tag, image_url: nil)
    }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must belong to a tag if it is not a carousel card' do
      expect {
        FactoryBot.create(:card)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'can have no tag if it is a carousel card' do
      expect {
        FactoryBot.create(:card, isCarousel: true)
      }.not_to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
