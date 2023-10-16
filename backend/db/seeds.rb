# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

board = Board.create({})
board.ident = "0632827995c388107667"
board.save

bucket = Bucket.create([{ name: "Not Started", board_id: board.id }, { name: "In Progress", board_id: board.id }])
first_bucket = bucket.first
second_bucket = bucket[1]

Card.create({ title: "Get routing working", bucket_id: first_bucket.id })
Card.create({ title: "Lexical integration", bucket_id: first_bucket.id })
Card.create({ title: "Authentication functionality", bucket_id: second_bucket.id })


