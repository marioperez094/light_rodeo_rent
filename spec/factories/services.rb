FactoryBot.define do
  factory :service do
    english_name { 'The Jacarandoso' }
    spanish_name { 'El Jacarandoso' }
    english_description { 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.' }
    spanish_description { 'This is a description for the mechanical bull inflatable. This is a description for the mechanical bull inflatable.' }
    service_type { 'Mechanical Bull' }
    dimensions { '13.5x13.5' }
    
  end
end