require 'rails_helper'

RSpec.describe Tag, type: :model do
  context 'create' do
    it 'must have an english name' do
      expect {
        FactoryBot.create(:tag, english_name: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an spanish name' do
      expect {
        FactoryBot.create(:tag, spanish_name: nil)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english name with more than 3 characters' do
      expect {
        FactoryBot.create(:tag, english_name: 'c' * 2)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish name with more than 3 characters' do
      expect {
        FactoryBot.create(:tag, spanish_name: 'c' * 2)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have an english name with less than 31 characters' do
      expect {
        FactoryBot.create(:tag, english_name: 'c' * 31)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a spanish name with less than 31 characters' do
      expect {
        FactoryBot.create(:tag, spanish_name: 'c' * 31)
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it 'must have a unique english name' do
      FactoryBot.create(:tag, english_name: 'unique')

      expect {
        FactoryBot.create(:tag, english_name: 'unique')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    
    it 'must have a unique spanish name' do
      FactoryBot.create(:tag, spanish_name: 'unique')

      expect {
        FactoryBot.create(:tag, spanish_name: 'unique')
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end