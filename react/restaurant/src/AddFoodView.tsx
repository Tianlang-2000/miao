import { useRef } from "react"
import { useInput } from "./hooks"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function AddFoodView() {
	let navigate = useNavigate()

	let name = useInput()
	let price = useInput()
	let desc = useInput()
	let category = useInput()
	let imgInputRef = useRef<HTMLInputElement>(null)

	function addFood(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault()
		let fd = new FormData()
		fd.append('name', name.value)
		fd.append('price', price.value)
		fd.append('desc', desc.value)
		fd.append('category', category.value)
		fd.append('status', 'on')
		fd.append('img', imgInputRef.current!.files![0])

		axios.post('/api/restaurant/1/food', fd).then(res => {
			console.log(res.data)
			navigate('/home/foods')
		})
	}

	return (
		<div>
			<form>

			<div className="flex items-center h-12">
				<input type="text" placeholder="名称" {...name}/>
			</div>
			<div className="flex items-center h-12">
				<input type="text" placeholder="价格" {...price}/>
			</div>
			<div className="flex items-center h-12">
				<input type="text" placeholder="描述" {...desc}/>
			</div>
			<div className="flex items-center h-12">
				<input type="text" placeholder="分类" {...category}/>
			</div>
			<div className="flex items-center h-12">
				<input type="file" placeholder="图片" ref={imgInputRef}/>
			</div>
			<div>
				<button onClick={addFood}>提交</button>
			</div>
			</form>
		</div>
	)
}