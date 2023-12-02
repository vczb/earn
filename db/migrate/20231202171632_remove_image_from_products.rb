class RemoveImageFromProducts < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :image
  end
end
