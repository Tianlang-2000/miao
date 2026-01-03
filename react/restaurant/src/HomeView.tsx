import { useAtom } from "jotai"
import { Suspense, useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { isLoginAtom } from './store'
import axios from "axios"

type RestaurantInfo = {
	title: string,
	id: string,
	name: string
}

export default function HomeView() {
	let [isLogin, setIsLogin] = useAtom(isLoginAtom)
	const navigate = useNavigate()

	let [userInfo, setUserInfo] = useState<null | RestaurantInfo>(null)
	useEffect(() => {
		axios.get('/api/userinfo').then(res => {
			setUserInfo(res.data)
		})
	}, [])
	useEffect(() => {
		if (isLogin == false) {
			navigate('/Login')
		}
	}, [isLogin])

	if (isLogin === false) {
		return null
	}
	return (
		<div className="flex">
			<div className="w-48 border-r">
				<span>{userInfo?.title}</span>
				<Link className="block" to="/home/orders">订单管理</Link>
				<Link className="block" to="/home/foods">菜品管理</Link>
				<Link className="block" to="/home/desks">桌面管理</Link>
				<button>退出</button>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<Outlet />
			</Suspense>
		</div>
	)
}