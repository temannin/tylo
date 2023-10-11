class AddIndexToBoard < ActiveRecord::Migration[7.0]
  def change
    add_index :boards, :ident, unique: true
  end
end
