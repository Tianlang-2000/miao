import { atom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'

const visibleTypeAtom = atom('all')

const editingIndexAtom = atom(-1)

export type Todo = {
  id: string | number,
  text: string,
  completed: boolean
}

const todosAtom = atomWithImmer<Todo[]>([
	{
		id:'dsaf',	
    text: 'Ghost in the Shell',
    completed: true
  },
  {
		id:'dsafee',
    text: 'Serial Experiments Lain',
    completed: false
  }
])

const leftCountAtom = atom((get) => {
  return get(todosAtom).filter(it => it.completed == true).length
})
const isAllCompletedAtom = atom((get) => {
  return get(todosAtom).every(it => it.completed == true)
})
const hasCompletedAtom = atom((get) => {
  return get(todosAtom).some(it => it.completed == true)
})
export {visibleTypeAtom, editingIndexAtom, todosAtom, leftCountAtom, isAllCompletedAtom,hasCompletedAtom }