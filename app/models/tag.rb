class Tag < ApplicationRecord
  validates :english_name, presence: true, length: { minimum: 3, maximum: 15 }
  validates :nombre_espanol, presence: true, length: { minimum: 3, maximum: 15 }

  validates_uniqueness_of :english_name
  validates_uniqueness_of :nombre_espanol
end
