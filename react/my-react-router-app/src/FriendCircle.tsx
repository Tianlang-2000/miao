import { Link } from 'react-router-dom'

export default function FriendCircle() {


	return (
		<div>
			<Link to='/discover'>返回</Link>
			<h1>朋友圈</h1>
			<div>
				<Link to='/chat/3'>3号朋友</Link>
				打卡
				<img src="" alt="" />
				<img src="" alt="" />
			</div>
			<div>
        <Link to="/chat/1">1号朋友</Link>
        吃好看的菜
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
		</div>
	)
}