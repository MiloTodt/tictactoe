# frozen_string_literal: true

class Player < ApplicationRecord
  validates_presence_of :name

end
