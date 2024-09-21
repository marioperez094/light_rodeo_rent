require 'rails_helper'

RSpec.describe Service, type: :model do
  context 'create' do
    it 'should have a user' do
      expect {
        user = FactoryBot.create(:user)
        Service.create!(
          english_name: 'The Jacarandoso',
          nombre_espanol: 'El Jacarandoso',
          english_description: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          descripcion_espanol: 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.',
          dimensions: '13.5 x 13.5',
          service_type: 'Mechanical Bull'
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
        FactoryBot.create(:service, nombre_espanol: nil, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english name with more than 9 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_name: 'c' * 9, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish name with more than 9 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, nombre_espanol: 'c' * 9, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english name with less than 21 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_name: 'c' * 21, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish name with less than 21 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, nombre_espanol: 'c' * 21, user: user)
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
        FactoryBot.create(:service, descripcion_espanol: nil, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english description with more than 19 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_description: 'c' * 19, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish description with more than 19 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, descripcion_espanol: 'c' * 19, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english description with less than 201 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, english_description: 'c' * 201, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish description with less than 201 characters' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, descripcion_espanol: 'c' * 201, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a service type' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, service_type: nil, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'can have no dimensions' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, dimensions: nil, user: user)
      }.not_to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have dimensions if inflatable type' do
      expect {
        user = FactoryBot.create(:user)
        FactoryBot.create(:service, service_type: 'Inflatable', dimensions: nil, user: user)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end