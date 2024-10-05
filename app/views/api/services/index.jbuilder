json.services do
  json.array! @services do |service|
    json.id                   service.id
    json.english_name         service.english_name
    json.spanish_name         service.spanish_name
    json.english_description  service.english_description
    json.spanish_description  service.spanish_description
    json.dimensions           service.dimensions
    json.service_type         service.service_type
  end
end