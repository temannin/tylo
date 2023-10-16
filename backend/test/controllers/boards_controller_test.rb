require '/home/tyler/dev/tylo/backend/test/test_helper.rb' # TODO: This is bad but it's the only way I can make the IDE work.

class BoardsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_boards_url, as: :json
    assert_response :success
  end

  test "should create board" do
    assert_difference("Board.count") do
      post api_boards_url, params: { board: { name: "Tyler" } }, as: :json
    end

    assert_response :created
  end

  # test "should show board" do
  #   get board_url(@board), as: :json
  #   assert_response :success
  # end
  #
  # test "should update board" do
  #   patch board_url(@board), params: { board: {  } }, as: :json
  #   assert_response :success
  # end
  #
  # test "should destroy board" do
  #   assert_difference("Board.count", -1) do
  #     delete board_url(@board), as: :json
  #   end
  #
  #   assert_response :no_content
  # end
end
