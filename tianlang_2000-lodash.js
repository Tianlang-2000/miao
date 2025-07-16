var tianlang_2000 = function() {
  function compact(Array) {
    var result = []
    for (var i = 0; i < Array.length; i++) {
      if (Array[i] !== null || undefined || 0 || NaN || '') {
        result.push(Array[i])
      }
    }
    return result
  }
}
