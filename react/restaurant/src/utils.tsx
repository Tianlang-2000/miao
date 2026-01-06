import { type Order } from './OrderManageView'

export function printOrder(order: Order) {
	let iframe = document.createElement('iframe')
	iframe.style.display = 'none'
	document.body.append(iframe)
	iframe.contentDocument!.write(`
		<!doctype html>
		<html lang="en">
  	<head>
    	<meta charset="UTF-8" />
    	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    	<title>document</title>
  	</head>
  	<body>
    	${
				order.details.map((item) => {
					return `${item.food.name} - ${item.amount} - ${item.food.price}`
				})
			}
  	</body>
		</html>
	`)

	iframe.contentWindow!.print()
}