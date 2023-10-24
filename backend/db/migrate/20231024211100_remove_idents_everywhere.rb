class RemoveIdentsEverywhere < ActiveRecord::Migration[7.0]
  def change
    remove_column :cards, :ident
    remove_column :buckets, :ident
    remove_column :boards, :ident
  end
end
