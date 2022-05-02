class ChangeProductIdForTransaction < ActiveRecord::Migration[6.1]
  def change
    change_column_null :transactions, :product_id, null: true, foreign_key: true
  end
end
