json.taggables do
  json.array! @taggables do |taggable|
    json.id taggable.id
    json.service_id               taggable.service_id
    json.tag_id                   taggable.tag_id

    json.service do
      json.id             taggable.service.id
      json.english_name   taggable.service.english_name
      json.spanish_name   taggable.service.spanish_name
  end

    json.tag do
      json.id              @taggable.tag.id
      json.english_name    @taggable.tag.english_name
      json.spanish_name  @taggable.tag.spanish_name
    end
  end
end
