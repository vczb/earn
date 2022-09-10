class AddIsAdminAndDiamondPriceInCentsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :is_admin, :boolean, default: false
    add_column :users, :diamond_price_in_cents, :integer, default: 1000
  end
end
