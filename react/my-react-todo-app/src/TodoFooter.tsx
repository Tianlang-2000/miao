import { useAtom, useAtomValue } from 'jotai'
import { leftCountAtom, hasCompletedAtom } from './store'


export default function TodoFooter() {
	const leftCount = useAtomValue(leftCountAtom)
	const hasCompleted = useAtomValue(hasCompletedAtom)

	return (
		<div>
			<span>{leftCount} item left</span>
			<div>
				<label><input type='checkbox' name='' id='' />All</label>
				<label><input type='checkbox' name='' id='' />Active</label> 
				<label><input type='checkbox' name='' id='' />Completed</label>
			</div>
			{hasCompleted &&
			<button onClick={ clearCompleted}>clear completed</button>
			}
		</div>
	)
}