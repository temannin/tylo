# frozen_string_literal: true
class Board < ApplicationRecord
  before_create :generate_ident
  has_many :buckets

  private

  def generate_ident
    self.ident = SecureRandom.hex(10) # Generate a random hex string of length 10
  end
end
