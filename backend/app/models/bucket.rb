class Bucket < ApplicationRecord
  has_one :board
  has_many :cards

  accepts_nested_attributes_for :cards
end
