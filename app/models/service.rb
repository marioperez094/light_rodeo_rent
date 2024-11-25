class Service < ApplicationRecord
  belongs_to :user
  has_many :taggables
  has_many :tags, through: :taggables, dependent: :nullify
  has_many_attached :images
  
  validates :english_name, presence: true, length: { minimum: 3, maximum: 30 }
  validates :spanish_name, presence: true, length: { minimum: 3, maximum: 30 }
  validates :dimensions, length: { minimum: 3, maximum: 30 }, allow_blank: true
  validates :english_description, presence: true, length: { minimum: 10, maximum: 500 }
  validates :spanish_description, presence: true, length: { minimum: 10, maximum: 500 }
end