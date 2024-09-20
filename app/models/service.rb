class Service < ApplicationRecord
    belongs_to :user
  
    validates :english_name, presence: true, length: { minimum: 10, maximum: 20 }
    validates :nombre_espanol, presence: true, length: { minimum: 10, maximum: 20 }
    validates :english_description, presence: true, length: { minimum: 20, maximum: 200 }
    validates :descripcion_espanol, presence: true, length: { minimum: 20, maximum: 200 }
    validates :service_type, presence: true
  end