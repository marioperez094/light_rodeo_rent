json.services do
  json.array! @services do |service|
    json.id                   service.id
    json.english_name         service.english_name
    json.spanish_name         service.spanish_name
    json.english_description  service.english_description
    json.spanish_description  service.spanish_description
    json.dimensions           service.dimensions

    json.tags do
      json.array! service.tags do |tag|
        if !tag.inflatable
          json.english_name    tag.english_name
          json.spanish_name    tag.spanish_name
        end
      end
    end

    json.images do
      json.array! service.images do |image|
        json.image_url        url_for(image)
      end
    end
  end
end