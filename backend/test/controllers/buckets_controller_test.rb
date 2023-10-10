require "test_helper"

class BucketsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bucket = buckets(:one)
  end

  test "should get index" do
    get buckets_url, as: :json
    assert_response :success
  end

  test "should create bucket" do
    assert_difference("Bucket.count") do
      post buckets_url, params: { bucket: { name: @bucket.name, order: @bucket.order } }, as: :json
    end

    assert_response :created
  end

  test "should show bucket" do
    get bucket_url(@bucket), as: :json
    assert_response :success
  end

  test "should update bucket" do
    patch bucket_url(@bucket), params: { bucket: { name: @bucket.name, order: @bucket.order } }, as: :json
    assert_response :success
  end

  test "should destroy bucket" do
    assert_difference("Bucket.count", -1) do
      delete bucket_url(@bucket), as: :json
    end

    assert_response :no_content
  end
end
