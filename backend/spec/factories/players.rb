# frozen_string_literal: true

FactoryBot.define do
  factory :player do
    name { Faker::Name.first_name }
    wins { Faker::Number.number(2) }
    losses { Faker::Number.number(2) }
    draws { Faker::Number.number(2) }
  end
end
