class CreateServiceTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :service_types do |t|
      t.string :english_name
      t.string :spanish_name

      t.timestamps
    end
  end
end
