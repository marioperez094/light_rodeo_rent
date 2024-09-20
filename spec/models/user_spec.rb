require 'rails_helper'

RSpec.describe User, type: :model do
  context 'create' do
    it 'should have many sessions' do
      user = FactoryBot.create(:user)
      expect(user.sessions).to eq([])
    end

    it 'must have a username' do
      expect {
        FactoryBot.create(:user, username: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a password' do
      expect {
        FactoryBot.create(:user, password: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end