import { Outlet, NavLink } from 'react-router-dom'

export default function Root() {

	return (
		<div>
			<div>
				<Outlet />
			</div>
			<div>
				-
				<NavLink to='/'>聊天</NavLink>
				-
				<NavLink to='/discover'>发现</NavLink>
				-
				<NavLink to='/me'>我</NavLink>
				-
			</div>
		</div>
	)
}