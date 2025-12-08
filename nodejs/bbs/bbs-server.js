const express = require('express')

const app = express()
const port = 8082
// 帖子数据
const posts = [{
	title: 'aaa',
	content: 'bbbbb',
	id: 9,
	timeStamp: new Date().toISOString(),
	ip: '192.168.1.1',
}
]
//帖子计数
let prevPostId = 10
// 评论数据
const comments = [{
	content: '111',
	postId: '99',
	timeStamp: new Date().toISOString(),
	ip: '192.168.1.1'
}]

app.use((req, res, next) => {
	console.log(req.method, req.url)
	next()
})
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//主页面
app.get('/', (req, res, next) => {
	res.type('html')
	.end(`
		<h1>BBS</h1>
		<div>
			<a href="/add-post">发帖</a>
		</div>
		<ul>
			${
				posts.map(post => {
					return `<li><a href="/post/${post.id}" target="_blank">${post.title}</a></li>`
				}).join('\n')
			}
		</ul>
	`)
})
//打开某个帖子
app.get('/post/:postId', (req, res, next) => {
	let postId = req.params.postId
	let post = posts.find(it => it.id == postId)
// 这里提交评论
	if (post) {
		let thisComments = comments.filter(it => it.postId == postId)

		res.type('html')
		.end(`
			<h1>帖子${post.title}</h1>
			<p>帖子${post.content}</p>
			<hr>
			${
				thisComments.map(comment => {
					return `
						<fieldset>
							<legend>${comment.timeStamp}</legend>
							<p>${comment.content}</p>
						</fieldset>
					`
				}).join('\n')
			}
			<hr>
			<form action="/comment" method="post">
				<textarea name="content"></textarea>
				<input value="${post.id}" name="postId" hidden/>
				<button type="submit">提交</button>
			</form>
		`)
	} else {
		res.type('html').status(404).end('帖子不存在')
	}
})
// 发帖页面的get请求，用户打开页面
app.get('/add-post', (req, res, next) => {
	res.type('html')
		.end(`
			<h1>发帖</h1>
			<form action="/add-post" method="post">
				<div>标题:</div>
				<input name="title">
				<div>内容: </div>
				<textarea name="content"></textarea>
				<div>
					<button>发布</button>
				</div>
			</form>
		`)
})
// 发帖页面的post请求，用户操作页面
app.post('/add-post', (req, res, next) => {
	let post = req.body
	post.id = prevPostId++
	post.timeStamp = new Date().toISOString()
	post.ip = req.ip

	posts.push(post)

	res.redirect('/post/' + post.id)
})
// 评论
app.post('/comment', (req, res, next) => {
	let content = req.body.content
	let postId = req.body.postId

	let comment = {
		content,
		postId,
		timeStamp: new Date().toISOString(),
		ip: req.ip,

	}
	comments.push(comment)

	res.redirect('/post/' + postId)
})
app.listen(port, () => {
	console.log('server listening on port',port)
})