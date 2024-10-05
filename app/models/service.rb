class Service < ApplicationRecord
    belongs_to :user
    has_many :taggables
    has_many :tags, through: :taggables
  
    validates :english_name, presence: true, length: { minimum: 10, maximum: 20 }
    validates :spanish_name, presence: true, length: { minimum: 10, maximum: 20 }
    validates :english_description, presence: true, length: { minimum: 20, maximum: 200 }
    validates :spanish_description, presence: true, length: { minimum: 20, maximum: 200 }
    validates :service_type, presence: true

    validates :dimensions, presence: true, if: :inflatable_service?

    private 

    def inflatable_service?
      service_type == 'Inflatable'
    end
  end