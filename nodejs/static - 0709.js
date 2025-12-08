const fs = require('fs')
const http = require('http')

const server = http.createServer()
const port = 8080

const baseDir = 'd:/kejian/miao'

server.on('request', (req, res) => {
  console.log(req.method, req.url)
  
  const targetUrl = baseDir + req.url
  fs.stat(targetUrl, (err, stat) => {
    if (err) {
      res.writeHead(404)
      res.end()
    } else {
      console.log(stat)
      if (stat.isFile()) {
        fs.readFile(targetUrl, (err, data) => {
          if (err) {
            res.writeHead(404)
            res.end()
          } else {
            res.write(data)
            res.end()
          }
        })
      } else if (stat.isDirectory()) {
        fs.readdir(targetUrl, {withFileTypes: true}, (err, entries) => {
          if (err) {
            res.writeHead(500)
            res.end()
          } else {
            res.writeHead(200, {
              'content-type': 'text/html; charset=utf8'
            })
            for(let entry of entries) {
              res.write(`<div><a href="${entry.name}${entry.isDirectory() ? "/" : ""}">${entry.name}${entry.isDirectory() ? "/" : ""}</a></div>`)
            }
            res.end()
          }
        })
      }
    }
  })
})

server.listen(port, () => {
  console.log(process.pid)
  console.log('Server listening on port', port)
})
