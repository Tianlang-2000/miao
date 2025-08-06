
const net = require('net')

const port = 8085

const sevrer = net.createServer(socket =>{
  socket.on('data', data => {
    var lines = data.toString().split('\r\n')
    var firstLine = lines.shift()
    var [method, url] = firstLine.split(' ')

    console.log(method, url, socket.remoteAddress)
    console.log(data.toString())

    if (url == '/time') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Concent-Type: text/html; charset=UTF-8\r\n')
      //socket.write('Concent-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('' + new Date())
      socket.end()
    } else if (url == '/red') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Concent-Type: text/html; charset=UTF-8\r\n')
      //socket.write('Concent-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('<html><link rel="stylesheet" href="aa.css"></html>')
      socket.end()
    } else if (url == '/aa.css') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Concent-Type: text/css; charset=UTF-8\r\n')
      //socket.write('Concent-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('html { background: red; }')
      socket.end()
    } else {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: sdofjfs\r\n')
      socket.write('Concent-Type: text/html\r\n')
      socket.write('Concent-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('<h1>aaaabbbbbbb</h1>')
      socket.end()
    }
  })
  socket.on('error', () => {
    socket.end()
  })
})

sevrer.listen(port, () => {
  console.log('sever listening on port', 8085)
})
