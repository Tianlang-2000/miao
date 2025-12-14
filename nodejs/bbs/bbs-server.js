const express = require('express')
const path = require('node:path')
const cookieParser = require('cookie-parser')
const Database = require('better-sqlite3')
const svgCaptcha = require('svg-captcha') 
const md5 = require('md5')
const multer  = require('multer')
const upload = multer({
	destination: './uploads/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

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
app.use('/uploads', express.static('./uploads'))
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
	let page = req.query.page ?? 1
	let size = 5
	let offset = (page - 1) * size
	let totalPosts = db.prepare('SELECT COUNT(*) AS total FROM posts').get().total
	let totalPages = Math.ceil(totalPosts / size)
	let posts = db.prepare('SELECT * FROM posts LIMIT ? OFFSET ?').all(size, offset)

	res.render('index.pug', {
		posts: posts,
		totalPages,
		page,
	})
})
// 打开某个帖子
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
			ON comments.createBy = users.Id
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
// 删除帖子
app.delete('/post/:postId', (req, res, next) => {
	let post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.postId)
	if (post) {
		if(req.user && req.user.id == post.createBy) {
			db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.postId)
			req.end()
		} else {
			req.status(401).end("无权限删除")
		}
	} else {
		req.end('')
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
app.get('/register', (req, res, next) => {
	res.redirect('/register.html')
})

app.post('/register', upload.single('avatar'), (req, res, next) => {
	
	// 最好验证
	let registerInfo = req.body // name password
	if (registerInfo.password !== registerInfo.password1) {
		res.type('html').end('密码不一致')
		return
	} 
	registerInfo.createDate = new Date().toISOString()
	registerInfo.salt = Math.random().toString(36).slice(2)
	registerInfo.password = md5(md5(registerInfo.password) + md5(registerInfo.salt))
	registerInfo.avatar = '/uploads/' + req.file.filename
	
	try {
		db.prepare(`
			INSERT INTO users (name, password, email, createDate, salt, avatar)
			VALUES ($name, $password, $email, $createDate, $salt, $avatar)`
		).run(registerInfo)
	} catch(e) {
		console.log(e)
		if (e.code == 'SQLITE_CONSTRAINT_UNIQUE') {
			res.end(e.massage)
			return
		} else {
			throw e
		}
	}
	res.type('html').end('注册成功，去<a href="/login.html">登录</a>')
})

//登录页面
app.get('/login', (req, res, next) => {
  res.render('login.pug')
})
app.post('/login', (req, res, next) => {
	let loginInfo = req.body
	
	// 验证验证码
	if(req.session.failureCount >= 3 && loginInfo.captcha !== req.session.captcha) {
		res.end('验证码错误')
		return
	}
  let targetUser = db.prepare('SELECT * FROM users WHERE name = ?').get(loginInfo.name)
	
	if (targetUser) {
		let saltedPassword = md5(md5(loginInfo.password) + md5(targetUser.salt))

		if (saltedPassword == targetUser.password) {
			res.cookie('loginUser', targetUser.name, {
				maxAge: 86400 * 1000,
				signed: true
			})
			res.redirect('/')
		} else {
			req.session.failureCount = (req.session.failureCount | 0) + 1
			res.type('html').end('密码错误')
		}
	} else {
		req.session.failureCount = (req.session.failureCount | 0) + 1
		res.type('html').end('用户名不存在')
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
// 密码找回
app.get('/forget', (req, res, next) => {
	req.render('/forget.pug')
})

let changePasswordMap = {
	// token: user
}
app.post('/forget', (req, res, next) => {
	let email = req.body.email.trim() 
	let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
	if (user) {
		let token =  Math.random().toString(36).slice(2)
		changePasswordMap[token] = user
		setTimeOut(() => {
			delete changePasswordMap[token]
		}, 20 * 60 * 1000)
		let link = 'http://localhost:8082/change-password?token=' + token
		// nodemailer
		//sendEmail(email, ` ${link}`)
		res.type('html').end('请查收电子邮件以修改密码')
	} else {
		res.end('')
	}
})
// 邮箱验证完，找回
app.get('/change-password', (req, res, next) => {
	let token = req.query.token
	let user = changePasswordMap[token]
	if (user) {
		res.render('change-password.pug', {
			user,
		})
	} else {
		res.end('过期了')
	}
})
app.post('/change-password', (req, res, next) => {
	let token = req.query.token
	let user = changePasswordMap[token]
	let body = req.body
	if (user) {
		if(body.password == body.password1) {
			let saltedPassword = md5(md5(body.password) + md5(user.salt))
			db.prepare('UPDATE users SET password = ? WHERE id = ?').run(saltedPassword, user.id)
		} else {
			res.type('html').end('两次密码不一致')
		}
	} else {
		res.end('过期了')
	}
})


// 刷库，刷之前备份数据，且需要先测试再使用,一般写另一个文件
// app.get('/updateDB', (req, res, next) => {
// 	let oldUsers = db.prepare('SELECT * FROM users WHERE salt IS NULL').all()

// 	for(let oldUser of oldUsers) {
// 		let salt = Math.random().toString(36).slice(2)
// 		let saltedPassword = md5(md5(oldUser.password) + md5(salt))
// 		db.prepare('UPDATE users SET password = ?, salt = ? WHERE id = ?').run(saltedPassword, salt, oldUser.id)
// 	}

// 	res.end('okk...')
// })
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