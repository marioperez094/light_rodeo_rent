class Card < ApplicationRecord
  belongs_to :tag, optional: true

  validates :image_url, presence: true
  validates :tag, presence: true, if: -> { !isCarousel }
end
