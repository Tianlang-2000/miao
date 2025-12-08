import { useNavigate, useParams } from 'react-router-dom'


export default function Chat() {

	const params = useParams()
	const navigate = useNavigate()

	return (
		<div>
			<button onClick={() => navigate(-1)}>返回</button>
			<div>正在与好友{params.friendId}聊天</div>
		</div>
	)
}