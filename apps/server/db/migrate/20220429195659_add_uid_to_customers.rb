class AddUidToCustomers < ActiveRecord::Migration[6.1]
  def change
    add_column :customers, :uid, :string
    add_index :customers, :uid, unique: true
  end
end
