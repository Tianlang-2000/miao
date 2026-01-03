import axios from "axios"
import { useInput } from "./hooks"
import { useAtom } from "jotai"

import { isLoginAtom } from "./store"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
	let name = useInput('')
	let password = useInput('')
	let captcha = useInput('')
	let [isLogin, setIsLogin] = useAtom(isLoginAtom)
	let navigate = useNavigate()

	async function login() {
		try {
			let res = await axios.post('/api/login', {
				name: name.value,
				password: password.value,
				captcha: captcha.value
			})
			setIsLogin(true)
			navigate('/home')
		} catch (e: any) {
			if (e.isAxiosError) {
				alert('登录失败：' + e.response?.data.msg)
			} else {
				throw e
			}
		} 
	}
	if (isLogin) {
		return <div>已登录，去<Link to="/home">管理页面</Link></div>
	}
	return <div>
		<div className="h-12 m-2 flex items-center">
			<label className="flex gap-2"><span className="w-12 inline-block text-right">用户名</span> <input type='text' name='name' {...name}/></label>
		</div>
		<div className="h-12 m-2 flex items-center">
			<label className="flex gap-2"><span className="w-12 inline-block text-right">密码</span> <input type='password' name='password' {...password}/></label>
		</div>
		<div className="h-12 m-2 flex items-center">
			<label className="flex gap-2">
				<span className="w-12 inline-block text-right">验证码</span>
				<input type='text' name='captcha' {...captcha}/> 
			</label>
		</div>
		<div className="h-12 m-2 flex items-center">
			<label className="flex gap-2">
				<span className="w-12 inline-block text-right"></span>
				<img className="bg-white h-8" src="/api/captcha" alt="验证码" />
			</label>
		</div>
		<div className="h-12 m-2 flex items-center">
			<button className="ml-14" onClick={login}>登录</button>
		</div>
		
	</div>
}

