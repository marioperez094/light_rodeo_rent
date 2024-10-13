json.tags do
  json.array! @tags do |tag|
    json.id              tag.id
    json.english_name    tag.english_name
    json.spanish_name    tag.spanish_name
    json.inflatable      tag.inflatable
  end
end