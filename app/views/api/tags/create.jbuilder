json.tag do
  json.id              @tag.id
  json.english_name    @tag.english_name
  json.spanish_name    @tag.spanish_name
  json.inflatable      @tag.inflatable

  if @tag.services
    json.services do
      json.array! @tag.services do |service|
        json.id                   service.id
        json.english_name         service.english_name
        json.spanish_name         service.spanish_name
        json.english_description  service.english_description
        json.spanish_description  service.spanish_description
        json.dimensions           service.dimensions

        json.images do
          json.array! service.images do |image|
            json.image_url       url_for(image)
          end
        end
      end
    end
  end
end