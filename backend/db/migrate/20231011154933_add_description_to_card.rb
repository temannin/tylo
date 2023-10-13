class AddDescriptionToCard < ActiveRecord::Migration[7.0]
  def change
    add_column :cards, :description, :string
  end
end
