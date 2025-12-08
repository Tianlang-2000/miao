server.on('request', (req, res) => {
  if (req.url == '/author') {
    let accept = req.headers['accept']

    if (accept == 'text/plain') {
      res.header(200, {
        'content-type': 'text/plain; charset=utf8'
      })
      res.end("i'm Marjin Heveberk...")
    } else if (accept == 'text/html') {
      res.header(200, {
        'content-type': 'text/html; charset=utf8'
      })
      res.end(
        `
        <h1>Author</h1>
        <span>Marjin</span>
        <div>....</div>
        `)
    } else if (accept == 'appliaction/json') {
      res.header(200, {
        'content-type': 'appliaction/json; charst=utf8'
      })
      res.end(JSON.stringify({
        name: 'marjin Heveberk',
        book: 'eloquent javascript'
      }))
    } else {
      res.end('unknow request type')
    }
  } else {
    res.end()
  }
})
