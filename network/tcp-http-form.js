
const net = require('net')

const port = 8085
let message = []

const server = net.createServer(socket =>{
  socket.on('data', data => {
    var lines = data.toString().split('\r\n')
    var firstLine = lines.shift()
    var [method, url] = firstLine.split(' ')

    console.log(method, url, socket.remoteAddress)
    console.log(data.toString())

    if (url == '/message-board') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Content-Type: text/html; charset=UTF-8\r\n')
      //socket.write('Concent-Length: 20\r\n')
      socket.write('\r\n')
      socket.write(
        `<form method="GET" action="leave-message">
        <p>Name: <input type="text" name="name"></p>
        <p>Message:<br><textarea name="message"></textarea></p>
        <p><button type="submit">Send</button></p></form>
        `
      )
      socket.end()
    } else if (url.startsWith('/leave-message')) {
      let [path, query] = url.split('?')
      let msg = parseQuery(query)

      message.push(msg)
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Content-Type: text/html; charset=UTF-8\r\n')
      //socket.write('Concent-Length: 20\r\n')
      socket.write('\r\n')
      for (let m of message) {
        socket.write(`
          <fieldset>
            <legend>${m.name}</legend>
            ${m.value}
          </fieldset>
          `
        )
      }
      socket.end()
    } else if (url == '/red') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Content-Type: text/html; charset=UTF-8\r\n')
      //socket.write('Concent-Length: 20\r\n')
      socket.write('\r\n')
      socket.write('<html><link rel="stylesheet" href="aa.css"></html>')
      socket.end()
    } else if (url == '/aa.css') {
      socket.write('HTTP/1.1 200 OK\r\n')
      socket.write('Date: ' + new Date().toISOString() + '\r\n')
      socket.write('Content-Type: text/css; charset=UTF-8\r\n')
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

server.listen(port, () => {
  console.log('sever listening on port', 8085)
})



function parseQuery(query) {
  let obj = {}
  let pairs = query.split('&')
  for (let pair of pairs) {
    let [name, value] = pair.split('=')
    obj[name] = value
  }
  return obj
}
