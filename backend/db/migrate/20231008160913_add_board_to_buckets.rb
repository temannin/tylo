class AddBoardToBuckets < ActiveRecord::Migration[7.0]
  def change
    add_reference :buckets, :board, null: false, foreign_key: true
  end
end
