import type { Todo } from './store'
import { useAtom } from 'jotai'
import { todosAtom } from './store'

type TodoItemProps = {
	todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
	const [, setTodos] = useAtom(todosAtom)

	function toggle() {
		const id = todo.id
		setTodos(todos => {
			const todo = todos.find(it => it.id == id)!
			todo.completed = !todo.completed
		})
	}

	function deleteTodo() {
		setTodos(todos => {
			const idx = todos.findIndex(it => it.id == todo.id)
			if (idx >= 0) {
				todos.splice(idx,1)
			}
		})
	}
	return (
		<li>
			<input type='checkbox' checked={todo.completed} onChange={toggle}/>
			<span>{ todo.text }</span>
			<button onClick={deleteTodo}>x</button>
		</li>
	)
}