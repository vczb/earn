class AddCompanyNameAndPhoneAndOwnerNameToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :company_name, :string
    add_column :users, :owner_name, :string
    add_column :users, :phone, :string
    add_column :users, :plan, :integer
  end
end
