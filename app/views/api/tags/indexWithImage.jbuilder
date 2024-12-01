json.tags do
  json.array! @tags do |tag|
    json.id              tag.id
    json.english_name    tag.english_name
    json.spanish_name    tag.spanish_name
    json.inflatable      tag.inflatable

    if tag.services.length > 0
      json.image_url url_for(tag.services[0].images[0])
    end
  end
end