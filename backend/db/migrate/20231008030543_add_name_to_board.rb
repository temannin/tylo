class AddNameToBoard < ActiveRecord::Migration[7.0]
  def change
    add_column :boards, :name, :string
  end
end
