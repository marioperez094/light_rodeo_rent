json.services do
  json.array! @services do |service|
    json.id                   service.id
    json.english_name         service.english_name
    json.nombre_espanol       service.nombre_espanol
    json.english_description  service.english_description
    json.descripcion_espanol  service.descripcion_espanol
    json.dimensions           service.dimensions
    json.service_type         service.service_type
  end
end