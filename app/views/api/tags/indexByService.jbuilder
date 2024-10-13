json.tags do
  json.array! @tags do |tag|
    json.id              tag.id
    json.english_name    tag.english_name
    json.spanish_name    tag.spanish_name
    json.inflatable      tag.inflatable

    json.service do
      json.array! tag.services do |service|
        if service.id === @service.id
          json.service true
        end
      end
    end
  end
end