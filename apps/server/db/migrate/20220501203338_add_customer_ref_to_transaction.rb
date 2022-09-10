class AddCustomerRefToTransaction < ActiveRecord::Migration[6.1]
  def change
    add_reference :transactions, :customer, null: false, foreign_key: true
  end
end
