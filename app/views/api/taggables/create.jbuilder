json.taggable do
  json.id @taggable.id
  json.service_id               @taggable.service_id
  json.tag_id                   @taggable.tag_id

  json.service do
    json.id             @taggable.service.id
    json.english_name   @taggable.service.english_name
    json.nombre_espanol @taggable.service.nombre_espanol
  end

  json.tag do
    json.id              @taggable.tag.id
    json.english_name    @taggable.tag.english_name
    json.nombre_espanol  @taggable.tag.nombre_espanol
  end
end