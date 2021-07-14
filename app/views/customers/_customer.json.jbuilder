json.extract! customer, :id, :name, :email, :phone, :cpf, :gender, :birthday, :references, :created_at, :updated_at
json.url customer_url(customer, format: :json)
