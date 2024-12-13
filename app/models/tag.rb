class Tag < ApplicationRecord
  has_many :taggables, dependent: :destroy
  has_many :services, through: :taggables
  has_one :card, dependent: :destroy

  validates :english_name, presence: true, length: { minimum: 3, maximum: 30 }
  validates :spanish_name, presence: true, length: { minimum: 3, maximum: 30 }

  validates_uniqueness_of :english_name
  validates_uniqueness_of :spanish_name 
end
