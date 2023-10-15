require "#{Rails.root}/lib/JSONUtils/helpers.rb"


class Api::BoardsController < ApplicationController
  before_action :set_board, only: %i[ show update destroy ]
  include JSONUtils

  # GET /boards
  def index
    @boards = Board.all
    render json: @boards
  end

  def show
    render json: remove_id_property(@board.as_json(include: { buckets: { include: :cards } }))
  end

  # POST /boards
  def create
    @board = Board.new(board_params)

    if @board.save
      render json: @board, status: :created, location: @board
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /boards/1
  def update
    if @board.update(board_params)
      render json: @board
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  # DELETE /boards/1
  def destroy
    @board.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_board
    @board = Board.find_by(ident: params[:id])
  end

  # Only allow a list of trusted parameters through.
  def board_params
    params.fetch(:board, {})
  end
end
