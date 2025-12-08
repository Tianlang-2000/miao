import { Link } from "react-router-dom";


export default function DiscoverPage() {
  

  return (
    <div>
      <div><Link to="/FriendCircle">朋友圈</Link></div>
      <div><Link to="/mini-program">小程序</Link></div>
      <div><Link to="/shake">摇一摇</Link></div>
      <div><Link to="/scaner">扫一扫</Link></div>
      <div><Link to="/videos">视频号</Link></div>
    </div>
  )
}