class MakeIdentAnIndexForBuckets < ActiveRecord::Migration[7.0]
  def change
    add_index :buckets, :ident, unique: true
  end
end
