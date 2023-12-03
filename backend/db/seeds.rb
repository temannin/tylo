# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

board = Board.create({})
board.id = "7ea19b73-4148-435f-9454-1ef209540cbb"
board.save

bucket = Bucket.create([{ name: "Not Started", board_id: board.id }, { name: "In Progress", board_id: board.id }])
first_bucket = bucket.first
second_bucket = bucket[1]

Card.create({ title: "Get routing working", bucket_id: first_bucket.id, order: 0 })
Card.create({ title: "Lexical integration", bucket_id: first_bucket.id, order: 1 })
Card.create({ title: "Authentication functionality", bucket_id: second_bucket.id, order: 0 })


