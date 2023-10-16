module JSONUtils::Helpers
  def remove_id_property(obj)
    if obj.is_a?(Hash)
      obj.each do |key, value|
        if key == 'id'
          obj.delete(key)
        else
          remove_id_property(value)
        end
      end
    elsif obj.is_a?(Array)
      obj.each { |item| remove_id_property(item) }
    end
    obj
  end
end
