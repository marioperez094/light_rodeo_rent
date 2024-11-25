class Taggable < ApplicationRecord
  belongs_to :tag
  belongs_to :service

  validate :validates_one_service_tag

  private 

  def validates_one_service_tag
    if !tag.inflatable
      @serviceTags = service.tags.select { |tag| !tag.inflatable }
      if @serviceTags.length > 0
        return errors.add("Este servicio ya tiene un categoria.")
      end
    end
  end
end
