require "test_helper"

class BucketsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bucket = buckets(:one)
  end
end
