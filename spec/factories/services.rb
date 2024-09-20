FactoryBot.define do
  factory :service do
    english_name { 'The Jacarandoso' }
    nombre_espanol { 'El Jacarandoso' }
    english_description { 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.' }
    descripcion_espanol { 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.' }
    dimensions { '13.5x13.5' }
    service_type { 'Mechanical Bull' }
    
  end
end