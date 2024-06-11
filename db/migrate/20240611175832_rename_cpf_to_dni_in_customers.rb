class RenameCpfToDniInCustomers < ActiveRecord::Migration[7.0]
  def change
    rename_column :customers, :dni, :dni
  end
end
