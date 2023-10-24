# frozen_string_literal: true
class Board < ApplicationRecord
  has_many :buckets

  accepts_nested_attributes_for :buckets
end
