const express = require('express')
const path = require('node:path')
const cookieParser = require('cookie-parser')

const app = express()
const port = 8082
// 设置模板文件的位置
app.set('views',  path.join(__dirname, './templates'))
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
// 用户数据
const users = [{
	name: 'Tianlang',
	password: '123456',
	email: 'ltl0009107417@gmail.com',
	createdDate: new Date().toISOString(),
}]

// 基础中间件配置
app.use((req, res, next) => {
	console.log(req.method, req.url)
	next()
})
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// 解析和解密（验证）cookie的中间件
app.use(cookieParser('sdfsdf'))
//主页面
app.get('/', (req, res, next) => {
	res.render('index.pug', {
		posts: posts,
		loginUser: req.signedCookies.loginUser
	})
})
//打开某个帖子
app.get('/post/:postId', (req, res, next) => {
	let postId = req.params.postId
	let post = posts.find(it => it.id == postId)
// 这里提交评论
	if (post) {
		let thisComments = comments.filter(it => it.postId == postId)
		res.render('post.pug', {
			post: post,
			comments: thisComments
		})
		// res.type('html')
		// .end(`
		// 	<h1>帖子${post.title}</h1>
		// 	<p>帖子${post.content}</p>
		// 	<hr>
		// 	${
		// 		thisComments.map(comment => {
		// 			return `
		// 				<fieldset>
		// 					<legend>${comment.timeStamp}</legend>
		// 					<p>${comment.content}</p>
		// 				</fieldset>
		// 			`
		// 		}).join('\n')
		// 	}
		// 	<hr>
		// 	<form action="/comment" method="post">
		// 		<textarea name="content"></textarea>
		// 		<input value="${post.id}" name="postId" hidden/>
		// 		<button type="submit">提交</button>
		// 	</form>
		// `)
	} else {
		res.render('404.pug')
	}
})
// 发帖页面的get请求，用户打开页面
app.get('/add-post', (req, res, next) => {
	res.render('add-post.pug')
})
// 发帖页面的post请求，用户操作页面
app.post('/add-post', (req, res, next) => {
	let post = req.body // 有title和content
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
// 注册页面
app.post('/register', (req, res, next) => {
	// 最好验证
	let registerInfo = req.body // name password
	if (registerInfo.password !== registerInfo.password1) {
		res.type('html').end('密码不一致')
		return
	} 
	if (users.some(user => user.name == registerInfo.name)) {
		res.type('html').end('已经注册')
		return
	}
	if (users.some(user => user.email == registerInfo.email)) {
		res.type('html').end('邮箱已用')
		return
	}
	registerInfo.createdDate = new Date().toISOString()
	users.push(registerInfo)

	res.type('html').end('注册成功，去<a href="/login.html">登录</a>')
})
//登录页面
app.post('/login', (req, res, next) => {
	let loginInfo = req.body
	let targetUser = users.find(user => {
		if(user.name == loginInfo.name && user.password == loginInfo.password) {
			return true
		}
	})
	
	if (targetUser) {
		res.cookie('loginUser', targetUser.name, {
			maxAge: 86400 * 1000,
			sign: true
		})
		res.redirect('/')
	} else {
		res.type('html').end('用户名或密码错误')
	}
})
// 登出
app.get('/logout', (req, res, next) => {
	res.clearCookie('loginUser')
	res.redirect('/')
})
// 用hbs模板
app.get('/test-tpl1', (req, res, next) => {
	res.render('test.hbs', {
		name: 'dingzhen'
	})
})
// 用ejs模板
app.get('/test-tpl2', (req, res, next) => {
	res.render('test2.ejs', {
		user: {
			name: "lilili"
		}
	})
})

app.listen(port, () => {
	console.log('server listening on port',port)
})