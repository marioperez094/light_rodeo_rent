class CreateTaggables < ActiveRecord::Migration[6.1]
  def change
    create_table :taggables do |t|
      t.belongs_to :service, index: true, foreign_key: true
      t.belongs_to :tag, index: true, foreign_key: true

      t.timestamps
    end

    add_index :taggables, [:service_id, :tag_id], unique: true
  end
end
