class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :price_in_diamonds
      t.string :image
      t.string :short_description
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
