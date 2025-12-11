const express = require('express')
const path = require('node:path')
const cookieParser = require('cookie-parser')
const Database = require('better-sqlite3')
const svgCaptcha = require('svg-captcha') 


const db = new Database('./bbs.sqlite3')

const app = express()
const port = 8082
// 设置模板文件的位置
app.set('views',  path.join(__dirname, './templates'))

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

const sessions = {}  // sessionId: session
// 下发sessionId的中间件
app.use((req, res, next) => {
	if(!req.cookies.sessionId) {
		let sessionId = Math.random().toString(36).slice(2)
		res.cookie('sessionId', sessionId, {
			maxAge: 86400000,
		})
		req.cookies.sessionId = sessionId
	}

	if (sessions[req.cookies.sessionId]) {
		req.session = sessions[req.cookies.sessionId]
	} else {
		req.session = sessions[req.cookies.sessionId] = {}
	}

	res.locals.session = req.session
	next()
})
// 保存登录
app.use((req, res, next) => {
	req.user = db.prepare('SELECT * FROM users WHERE name = ?').get(req.signedCookies.loginUser)

	res.locals.loginUser = req.user
	res.locals.isLogin = !!req.user
	next()
})
//主页面
app.get('/', (req, res, next) => {
	let posts = db.prepare('SELECT * FROM posts').all()

	res.render('index.pug', {
		posts: posts,
		loginUser: req.signedCookies.loginUser
	})
})
//打开某个帖子
app.get('/post/:postId', (req, res, next) => {
	let post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.postId)
// 这里提交评论
	if (post) {
		// 显示评论
		let thisComments = db.prepare(`
			SELECT
			  comments.id,
				comments.content,
				comments.createDate,
				users.id AS userId,
				users.name
			FROM comments
			JOIN users 
			ON comments.createBy = userId
			WHERE postId = ?`).all(req.params.postId)
		let postOwner = db.prepare('SELECT * FROM users WHERE id = ?').get(post.createBy)

		res.render('post.pug', {
			post: post,
			comments: thisComments,
			postOwner,
		})
	} else {
		res.render('404.pug')
	}
})
// 发帖页面的get请求，用户打开页面
app.get('/add-post', (req, res, next) => {
	if (req.user) {
		res.render('add-post.pug')
	} else {
		res.end('请登录')
	}
})
// 发帖页面的post请求，用户操作页面
app.post('/add-post', (req, res, next) => {
	if (!req.user) {
		res.end('登录！')
		return
	}

	// 创建全新对象，不污染 req.body
	const postData = {
		title: req.body.title,
		content: req.body.content,
		createDate: new Date().toISOString(),
		createBy: req.user.id
	}
	console.log(postData.createBy)
	const result = db.prepare(`
		INSERT INTO posts (title, content, createDate, createBy)
		VALUES ($title, $content, $createDate, $createBy)
	`).run(postData)

	res.redirect('/post/' + result.lastInsertRowid)
})
// 评论
app.post('/comment', (req, res, next) => {
	if (!req.user) {
		res.end('先登录')
		return
	}
	let content = req.body.content
	let postId = req.body.postId
	let createBy = req.user.id

	let comment = {
		content,
		postId,
		createDate: new Date().toISOString(),
		createBy,

	}
	
	let result = db.prepare(`
		INSERT INTO comments(content, postId, createDate, createBy)
		VALUES ($content, $postId, $createDate, $createBy)
		`).run(comment)

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
	registerInfo.createDate = new Date().toISOString()
	
	try {
		db.prepare(`
			INSERT INTO users (name, password, email, createDate)
			VALUES ($name, $password, $email, $createDate)`
		).run(registerInfo)
	} catch(e) {
		console.log(e)
		if (e.code == 'SQLITE_CONSTRAINT_UNIQUE') {
			res.end(e.massage)
			return
		} else {
			e
		}
	}
	res.type('html').end('注册成功，去<a href="/login.html">登录</a>')
})

app.get('/login', (req, res, next) => {
	res.render('login.pug')
})
//登录页面
app.post('/login', (req, res, next) => {
	let loginInfo = req.body
	
	// 验证验证码
	if(req.session.failureCount >= 3 && loginInfo.captcha !== req.session.captcha) {
		res.end('验证码错误')
		return
	}
  let targetUser = db.prepare('SELECT * FROM users WHERE name = ?').get(loginInfo.name)

	if (targetUser) {
		res.cookie('loginUser', targetUser.name, {
			maxAge: 86400 * 1000,
			signed: true
		})
		res.redirect('/')
	} else {
		req.session.failureCount = (req.session.failureCount | 0) + 1
		res.type('html').end('用户名或密码错误')
	}
})
// 登出
app.get('/logout', (req, res, next) => {
	res.clearCookie('loginUser')
	res.redirect('/')
})
// 删评论
app.post('/delete-comment/:commentId', (req, res, next) => {
	db.prepare('DELETE FROM comments WHERE id = ?').run(req.params.commentId)
	res.redirect(   req.get('referer')   )
})
// 验证码环节
app.get('/captcha', (req, res, next) => {
	// 服务器生成随机码并画到图里
	let captcha = svgCaptcha.create()
	req.session.captcha = captcha.text
	res.type('svg').end(captcha.data)
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