import * as actionTypes from './actions';
import axios from 'axios';

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}


export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	}
}


export const fetchOrders = (token) => {
	return dispatch => {
		dispatch(fetchOrdersStart())

		axios.get("https://my-e-shop-bb02e.firebaseio.com/Orders.json?auth=" + token)
			.then(
				res => {
					console.log(res)
					dispatch(fetchOrdersSuccess(res.data))
				}
			)
			.catch(err => {
				console.log(err)
				dispatch(fetchOrdersFail(err))
			})
	}
}


// export const purchaseInit = () => {
// 	return {
// 		type: actionTypes.PURCHASE_INIT
// 	}
// }