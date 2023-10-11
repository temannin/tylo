class MakeIdentInBoardsNotNull < ActiveRecord::Migration[7.0]
  def generate_random_ident
    return SecureRandom.hex(10)
  end

  def change
    Board.where(ident: nil).update_all(ident: generate_random_ident)
    change_column :boards, "ident", :string, null: false
  end
end
