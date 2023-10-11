class Bucket < ApplicationRecord
  before_create :generate_ident
  has_one :board
  has_many :cards

  private

  def generate_ident
    self.ident = SecureRandom.hex(10) # Generate a random hex string of length 10
  end
end
