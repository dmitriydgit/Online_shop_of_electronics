import * as actionTypes from "../actions/actions";


let initialState = {
	orders: null,
	loading: false,
	error: null
}

const ordersReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ORDERS_START:
			return {
				...state,
				loading: true
			}
		case actionTypes.FETCH_ORDERS_SUCCESS:

			const updatedOrders = [];
			const orders = { ...action.orders }
			for (let order in orders) {
				const newOrder = {
					[order]: orders[order].orderInfo
				}
				updatedOrders.push(newOrder)
			}
			//console.log(updatedOrders)

			return {
				...state,
				loading: false,
				orders: updatedOrders
			}
		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			}

		default:
			return state;
	}
}

export default ordersReducer;