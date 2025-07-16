var tianlang_2000 = {
  compact: function (array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== null && array[i] !== false && array[i] !== undefined && array[i] !== 0 && array[i] !== '' && !Number.isNaN(array[i])) {
        result.push(array[i])
      }
    }
    return result
  }
}
