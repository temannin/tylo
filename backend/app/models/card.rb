class Card < ApplicationRecord
  before_create :generate_ident
  belongs_to :bucket

  private

  def generate_ident
    self.ident = SecureRandom.hex(10)
  end
end
