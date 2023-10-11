class MakeIdentNotNullInCards < ActiveRecord::Migration[7.0]

  def generate_ident
    return SecureRandom.hex(10)
  end

  def change
    Card.where(:ident => nil).update(:ident => generate_ident)
    change_column "cards", "ident", :string, null: false
  end
end
