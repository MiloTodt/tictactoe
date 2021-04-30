# frozen_string_literal: true

class Player < ApplicationRecord
  validates_presence_of :name

  def win_percentage
    (wins.to_f + (draws / 2)) / (wins + losses + draws)
  end
end
