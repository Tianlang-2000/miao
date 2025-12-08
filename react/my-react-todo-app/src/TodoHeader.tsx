import { useAtom } from 'jotai'
import { isAllCompletedAtom, todosAtom } from './store'
import type { KeyboardEvent } from 'react'

export default function TodoHeader() {
	const [isAllCompleted] = useAtom(isAllCompletedAtom)
	const [, setTodos] = useAtom(todosAtom)

	function toggleAll() {
		setTodos(todos => {
			todos.forEach(it => {
				it.completed = !isAllCompleted
			})
		})
	}

	function addTodo(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key == 'Enter') {
			const text = e.currentTarget.value
			if(text) {
				e.currentTarget.value = ''
				setTodos(todos => {
				todos.push({
					id: Math.random(),
					text,
					completed: false,
				})
			})
			}
		}
	}
	return <div>
		<input type='checkbox' checked={isAllCompleted} onChange={toggleAll}/>
		<input type='text' onKeyDown={addTodo}/>
	</div>
}