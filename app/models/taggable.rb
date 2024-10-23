class Taggable < ApplicationRecord
  belongs_to :tag
  belongs_to :service

  validate :validates_one_service_tag

  private 

  def validates_one_service_tag
    unless tag.inflatable || service.tags.length === 0 
      errors.add(:tag, "Este servicio ya tiene un categoria.")
    end
  end
end
