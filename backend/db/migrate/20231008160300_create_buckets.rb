class CreateBuckets < ActiveRecord::Migration[7.0]
  def change
    create_table :buckets do |t|
      t.string :name
      t.integer :order

      t.timestamps
    end
  end
end
