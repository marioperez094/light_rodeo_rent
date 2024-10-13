class Service < ApplicationRecord
    belongs_to :user
    has_many :taggables
    has_many :tags, through: :taggables
    has_many_attached :images
  
    validates :english_name, presence: true, length: { minimum: 3, maximum: 20 }
    validates :spanish_name, presence: true, length: { minimum: 3, maximum: 20 }
    validates :english_description, presence: true, length: { minimum: 20, maximum: 200 }
    validates :spanish_description, presence: true, length: { minimum: 20, maximum: 200 }

    private 

    def inflatable_service?
      service_type == 'Inflables'
    end
  end