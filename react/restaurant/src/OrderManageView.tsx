import axios from "axios"
import { useEffect, useState } from "react"
import { printOrder } from "./utils.tsx"
import { makeAutoObservable, observable } from 'mobx'
import { observer } from "mobx-react"
export type Order = {
	id: number,
	rid: number,
	did: number,
	deskName: string,
	customCount: number,
	status: 'pending' | 'confirmed'| 'completed',
	timestamp: string,
	totalPrice: number,
	details: {
		food: {
			id: number,
			rid: number,
			name: string,
			desc: string,
			price: number,
			img: string,
			category: string,
			status: string,
		},
		amount: number
	}[],
}

class OrderManager {
	orders: Order[] = []
	constructor() {
		makeAutoObservable(this)
	}
	deleteOrder(idx: number) {
		this.orders.splice(idx, 1)
	}
	changeOrderStatus(idx: number, status: Order['status']) {
		this.orders[idx].status = status
	}
	addOrders(...orders: Order[]) {
		this.orders.push(...orders)
	}
}
function OrderManageView() {
	let [manager] = useState(() => observable(new OrderManager()))
	useEffect(() => {
		let ignore = false

		axios.get('/api/restaurant/1/order').then(res => {
			if(!ignore) {
				manager.addOrders(...res.data)
			}
		})
		return () => {
			ignore = true
		}
	}, [])

	async function deleteOrder(idx: number) {
		let order = manager.orders[idx]
		await axios.delete(`/api/restaurant/1/order/${order.id}`)
			manager.deleteOrder(idx)
	}

	async function confirmOrder(idx: number) {
		let order = manager.orders[idx]
		await axios.put(`/api/restaurant/1/order/${order.id}/status`, {
			status: 'confirmed'
		})
		manager.changeOrderStatus(idx, 'confirmed')
	}
	async function completedOrder(idx: number) {
		let order = manager.orders[idx]
		axios.put(`/api/restaurant/1/order/${order.id}/status`, {
			status: 'completed'
		})
		manager.changeOrderStatus(idx, 'completed')
	}
	return (
		<div>
			订单管理页面
			<ul>
				{
					manager.orders.map((order, idx) => {
						return (
							<li className="border flex rounded" key={order.id}>
								<div>
									<div>座号：{order.deskName}</div>
									<div>人数：{order.customCount}</div>
									<div>状态：{order.status == 'pending' ? '待确认' : order.status == 'confirmed' ? '已确认' : '已完成' }</div>
									<div>时间：{order.timestamp}</div>
									<div>
										<button onClick={() => printOrder(order)}>打印</button>
										{order.status === 'pending' && 
										<button onClick={() => confirmOrder(idx)}>确认</button>
										}
										{order.status === 'confirmed' &&
										<button onClick={() => completedOrder(idx)}>完成</button>
										}
										<button onClick={() => deleteOrder(idx)}>删除</button>
									</div>
								</div>
								<div className='border-l'>
									{order.details.map((item, idx) => {
										return (
											<div key={idx}>
												<div>菜名：{item.food.name}</div>
												<div>数量：{item.amount}</div>
												<div>价格：{item.food.price}x{item.amount}</div>
											</div>
										)
									})}
								</div>
							</li>
							
						)
					})
				}
			</ul>
		</div>
	)
}

export default observer(OrderManageView)