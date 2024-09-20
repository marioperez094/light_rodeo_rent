class CreateServices < ActiveRecord::Migration[6.1]
  def change
    create_table :services do |t|
      t.string :english_name
      t.string :nombre_espanol
      t.string :english_description
      t.string :descripcion_espanol
      t.string :dimensions
      t.string :service_type
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end