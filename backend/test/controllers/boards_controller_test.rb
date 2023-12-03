
class BoardsControllerTest < ActionDispatch::IntegrationTest

  board_id = "7ea19b73-4148-435f-9454-1ef209540cbb"

  setup do
    board = Board.create({})
    board.id = board_id
    board.save
  end

  teardown do
    Board.find(board_id).destroy
  end

  test "should get index with success" do
    get api_boards_url, as: :json
    assert_response :success
  end

  # Test description: "/api/boards returns array of board with no buckets parameter"
  test "/api/boards returns array of board with no buckets parameter" do
    # Making a GET request to the specified URL
    get api_boards_url

    # Asserting that the response status is success (HTTP 200)
    assert_response :success

    # Parsing the response body as JSON
    response_json = JSON.parse(response.body)

    # Asserting that the 'buckets' key is not present in the response
    assert_not_includes response_json, 'buckets'

    # Asserting that the parsed JSON is an instance of Array
    assert_instance_of Array, response_json

    # Asserting that the length of the array is 1
    assert_equal 1, response_json.length
  end

  # Test description: "/api/boards/:id returns board with buckets parameter"
  test "/api/boards/:id returns board with buckets parameter" do
    # Making a GET request to the URL with a specific board ID
    get api_board_url(board_id)

    # Asserting that the response status is success (HTTP 200)
    assert_response :success

    # Parsing the response body as JSON
    response_json = JSON.parse(response.body)

    # Asserting that the 'buckets' key is present in the response
    assert_includes response_json, 'buckets'
  end

end
