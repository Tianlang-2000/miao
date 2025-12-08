const express = require('express')

const app = express()
const port = 8082

app.use((req, res, next) => {
	console.log(req.method, req.url)
	next()
})
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, () => {
	console.log('server listening on port',port)
})