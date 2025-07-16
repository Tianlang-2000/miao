var tianlang_2000 = {
  compact: function (array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== null || undefined || 0 || NaN || '') {
        result.push(array[i])
      }
    }
    return result
  }
}
