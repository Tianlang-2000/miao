import { useVoteStore } from "@/stores/vote"
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

export function useSelectOne() {
	let selectIndex = ref(-1)
	function setSelected(idx: number) {
		if (selectIndex.value == idx) {
			selectIndex.value = -1
		} else {
			selectIndex.value = idx
		}
	}

	return [
		selectIndex,
		setSelected,
	] as const //如果不这样，则推导为 （xxx | yyy)[],第一项类型就是xxx|yyy
}

export function useLogin() {
  let voteStore = useVoteStore()
	let router = useRouter()
	let route = useRoute()

	if (voteStore.user == null) {
		router.replace('/login?next=' + route.fullPath)
		return false 
	}
	return true
}