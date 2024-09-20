json.tags do
  json.array! @tags do |tag|
    json.id              tag.id
    json.english_name    tag.english_name
    json.nombre_espanol  tag.nombre_espanol
  end
end