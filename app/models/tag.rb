class Tag < ApplicationRecord
  has_many :taggables
  has_many :services, through: :taggables, dependent: :delete_all

  validates :english_name, presence: true, length: { minimum: 3, maximum: 15 }
  validates :spanish_name, presence: true, length: { minimum: 3, maximum: 15 }

  validates_uniqueness_of :english_name
  validates_uniqueness_of :spanish_name
  
end
