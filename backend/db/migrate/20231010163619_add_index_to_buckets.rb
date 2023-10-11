class AddIndexToBuckets < ActiveRecord::Migration[7.0]
  def change
    add_column :buckets, "ident", :string
  end
end
