class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.string :english_name
      t.string :spanish_name
      t.boolean :inflatable

      t.timestamps
    end
  end
end
