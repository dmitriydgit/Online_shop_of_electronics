import * as actionTypes from './actions';
import axios from 'axios';

export const addToCart = (item) => {
	return {
		type: actionTypes.ADD_ITEM_TO_CART,
		item: item
	}
}

export const removeFromCart = (item) => {
	return {
		type: actionTypes.REMOVE_ITEM_FROM_CART,
		item: item
	}
}

export const clearCart = () => {
	return {
		type: actionTypes.CLEAR_CART,

	}
}

export const orderStart = () => {
	return {
		type: actionTypes.ORDER_START
	}
}

export const orderSuccess = () => {
	return {
		type: actionTypes.ORDER_SUCCESS

	}
}

export const orderFail = (error) => {
	return {
		type: actionTypes.ORDER_FAIL,
		error: error
	}
}

export const initOrdering = () => {
	return dispatch => {
		dispatch(orderStart());
	}
}

export const orderGoods = (orderData, token) => {
	return dispatch => {
		axios.post("https://my-e-shop-bb02e.firebaseio.com/Orders.json", orderData)
			.then(
				res => {
					console.log(res)
					dispatch(orderSuccess())
					dispatch(clearCart())
				}
			)
			.catch(err => {
				console.log(err)
				dispatch(orderFail(err))
			})
	}
} 