// const { readFile } = require("fs")

// var a = fs.readFileSync('a.txt')

// var a = await fs.readFile('a.txt')

// var http = require("http");

// var server = http.createServer();


// server.on('request', (request, response) => {
//   console.log(request.method, request.url)
//   response.writeHead(200, {"Content-Type": "text/html"});
//   response.write("<h1>Hello!</h1><p>You asked for <code>" +
//                  request.url + "</code></p>");
//   response.end()
// })
// server.listen(80, () => {
//   console.log('listening on port', 80)
// });



// tcp
// server.on('connect', connect => {
//   connect.write('http/1.1 200 ok\r\n')
//   conectfc.write('content-type: text/html\r\n\r\n')
//   connect.write('<h1></h1>')
// })

var count = 0
var start = Date.now()
setImmediate(function f() {
  count++
  if (Date.now() - start < 1000) {
    setImmediate(f)
  } else {
    console.log(count)
  }
})
