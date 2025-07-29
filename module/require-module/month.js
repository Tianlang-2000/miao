var monthNames = ['Januaray', 'feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
  'October', 'November', 'December'
]

function number(name) {
  return monthNames[name] + 1
}
function name(number) {
  return monthNames.indexOf(number - 1)
}

exports.name = name
exports.number = number
