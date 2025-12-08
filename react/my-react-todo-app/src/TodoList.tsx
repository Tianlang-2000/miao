import TodoItem from './TodoItem'
import { useAtom } from 'jotai'
import { todosAtom } from './store'

export default function TodoList() {
	const [todos] = useAtom(todosAtom)

	return <ul>
		{
			todos.map((todo) => {
				return <TodoItem todo={todo}/>
			})
		}
	</ul>
}