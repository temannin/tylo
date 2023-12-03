class AddOrderToCards < ActiveRecord::Migration[7.0]
  def change
    add_column :cards, :order, :integer
  end
end
