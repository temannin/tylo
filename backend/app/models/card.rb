class Card < ApplicationRecord
  belongs_to :bucket

  before_validation :set_default_title

  private

  def set_default_title
    self.title = 'Untitled' if title.blank?
  end
end
