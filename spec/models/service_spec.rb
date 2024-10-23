require 'rails_helper'

RSpec.describe Service, type: :model do
  context 'create' do
    it 'should have a user' do
      expect {
        user = FactoryBot.create(:user)
        Service.create!(
          english_name: 'The Jacarandoso',
          spanish_name: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          spanish_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5 x 13.5',
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english name' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_name: nil, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english name' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, spanish_name: nil, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english name with more than 2 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_name: 'c' * 2, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish name with more than 2 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, spanish_name: 'c' * 2, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english name with less than 31 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_name: 'c' * 31, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish name with less than 31 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, spanish_name: 'c' * 31, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english description' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_description: nil, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish description' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, spanish_description: nil, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english description with more than 10 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_description: 'c' * 9, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish description with more than 10 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, spanish_description: 'c' * 9, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english description with less than 501 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_description: 'c' * 501, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish description with less than 501 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, spanish_description: 'c' * 501, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'can have no dimensions' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, dimensions: nil, user: user)
      }.not_to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end