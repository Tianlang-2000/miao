var tianlang_2000 = {
  compact: function (array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== null && array[i] !== false && array[i] !== undefined && array[i] !== 0 && array[i] !== '' && !Number.isNaN(array[i])) {
        result.push(array[i])
      }
    }
    return result
  },

  chunk: function (array, size) {
    if (!Array.isArray(array) || size <= 0) return []
    const result = []
    for (var i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  },

  fill: function (array, value, start = 0, end = array.length) {
    const result = []
    for (var i = 0; i < array.length; i++) {
      if (start <= i < end) {
        result.push(value)
      }
      result.push(array[i])
    }
    return result
  }
}
