class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :image_url
      t.boolean :isCarousel
      t.belongs_to :tag, index: true, foreign_key: true

      t.timestamps
    end
  end
end
