import {
  createBrowserRouter,
} from "react-router";
import Root from './Root'
import ChatList from './chatList'
import Me from './Me'
import FriendCircle from './FriendCircle'
import Chat from './Chat'
import DiscoverPage from './DiscoverPage'

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
		children: [
			{
				path: "",
				element: <ChatList />,
			},
			{
				path: 'me',
				element: <Me />
			},
			{
				path: 'discover',
				element: <DiscoverPage />,
					
			}
		]
  },
	{
		path: '/FriendCircle',
		element: <FriendCircle />
	},
	{
		path: '/Chat/:friendId',
		element: <Chat />
	}
]);

export default router