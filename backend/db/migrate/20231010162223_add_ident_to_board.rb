class AddIdentToBoard < ActiveRecord::Migration[7.0]
  def change
    add_column :boards, :ident, :string
  end
end
