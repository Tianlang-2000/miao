import { makeAutoObservable } from 'mobx'
import { type Food } from './OrderManageView'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useInput } from './hooks'
class FoodManager {
	foods: Food[] = []
	constructor () {
		makeAutoObservable(this)
	}
	addFood(...foods: Food[]) {
		this.foods.push(...foods)
	}
	setFoodStatus(idx: number, status: Food['status']) {
		this.foods[idx].status = status
	}
}

function FoodManageView() {
	let [manager] = useState(() => new FoodManager())

	useEffect(() => {
		let ignore = false
		axios.get(`/api/restaurant/1/food`)
			.then(res => {
				if (!ignore) {
					manager.addFood(...res.data)
				}
			})
		
		return () => {
			ignore = true
		}
	}, [])

	
	return (
		<div className="grow">
			菜品管理页面
			<Link to="/home/add-food">添加菜品</Link>
			<div className='p-2 space-y-2'>
				{
					manager.foods.map((foodItem, idx) => {
						return <FoodItem key={foodItem.id} manager={manager} foodItem={foodItem} idx={idx}/>
					})
				}
			</div>
		</div>
	)
}
type FoodItemProp = {
	foodItem: Food,
	idx: number,
	manager: FoodManager
}

// 该组件表示菜品管理页面的一个菜品条目
const FoodItem: React.FC<FoodItemProp> = observer(({ manager, foodItem, idx }) => {
	let [editing, setEditing] = useState(false)

	let name = useInput(foodItem.name)
	let price = useInput(String(foodItem.price))
	let desc = useInput(foodItem.desc)
	let category = useInput(foodItem.category)
	let imgInputRef = useRef<HTMLInputElement>(null)
	
	async function putOn(idx: number) {
		let food = manager.foods[idx]
		await axios.put(`/api/restaurant/1/food/${food.id}`, {
			status: 'on'
		})
		manager.setFoodStatus(idx, 'on')
	}
	async function putOff(idx: number) {
		let food = manager.foods[idx]
		await axios.put(`/api/restaurant/1/food/${food.id}`, {
			status: 'off'
		})
		manager.setFoodStatus(idx, 'off')
	}
	async function handleEdit() {
		let fd = new FormData()
		fd.append('name', name.value)
		fd.append('price', price.value)
		fd.append('desc', desc.value)
		fd.append('category', category.value)
		// 选了文件就上传新的，否则就不上传，后端会沿用以前的
		if (imgInputRef.current!.files!.length > 0) {
			fd.append('img', imgInputRef.current!.files![0])
		}
		let res = await axios.put(`/api/restaurant/1/food/${foodItem.id}`, fd)
		// 该响应返回的是编辑后的信息
		manager.foods[idx] = res.data
		setEditing(false)
	}
	if (editing) {
		return (
			<div key={foodItem.id} className="border rounded p-2 flex gap-2">
				<img className="w-24 h-24" src={'/upload/' + foodItem.img} alt={foodItem.name} />
				<div>
					<div className="flex p-2">名称: <input className='border' type="text" {...name} /></div>
					<div className="flex p-2">价格: <input className='border' type="text" {...price} /></div>
					<div className="flex p-2">描述: <input className='border' type="text" {...desc} /></div>
					<div className="flex p-2">分类: <input className='border' type="text" {...category} /></div>
					<div className="flex p-2">图片: <input className='border' type="file" ref={imgInputRef} /></div>
					<div className="flex p-2 gap-2">
						<button onClick={handleEdit}>确定</button>
						<button onClick={() => setEditing(false)}>取消</button>
					</div>
				</div>
			</div>
		)
	}
	return (
		<div key={foodItem.id} className="border rounded p-2 flex gap-2 shrink-0 w-full">
			<img className="w-24 h-24" src={'/upload/' + foodItem.img} alt={foodItem.name} />
			<div>
				<div>名字: {foodItem.name} </div>
				<div>价格: {foodItem.price} </div>
				<div>描述: {foodItem.desc} </div>
				<div>分类: {foodItem.category} </div>
				<div>上架状态: {foodItem.status == 'on' ? '上架中' : ' 已下架'} </div>
				<div className="flex gap-2">
					{foodItem.status == 'on' && <button onClick={() => putOff(idx)}>下架</button>}
					{foodItem.status == 'off' && <button onClick={() => putOn(idx)}>上架</button>}

					<button onClick={() => setEditing(true)}>编辑</button>
					<button>删除</button>
				</div>
			</div>
		</div>
	)
})

export default observer(FoodManageView)