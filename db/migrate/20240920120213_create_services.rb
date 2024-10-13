class CreateServices < ActiveRecord::Migration[6.1]
  def change
    create_table :services do |t|
      t.string :english_name
      t.string :spanish_name
      t.string :english_description
      t.string :spanish_description
      t.string :dimensions
      t.string :image_url
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end