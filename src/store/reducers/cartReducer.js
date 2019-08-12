import * as actionTypes from "../actions/actions";
import { createUniqId } from '../../shared/utility'

let initialState = {
	itemsInCart: [],
	ordering: false,
	ordered: false,
	error: null
}

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_ITEM_TO_CART:
			const newItem = { ...action.item }
			newItem.id = createUniqId();
			return {
				...state,
				itemsInCart: state.itemsInCart.concat(newItem),
				ordered: false

			}
		case actionTypes.REMOVE_ITEM_FROM_CART:
			return {
				...state,
				itemsInCart: state.itemsInCart.filter(item => {
					return item.id !== action.item.id;
				})
			}
		case actionTypes.CLEAR_CART:
			return {
				...state,
				itemsInCart: [],
			}

		case actionTypes.ORDER_START:
			return {
				...state,
				ordering: true
			}

		case actionTypes.ORDER_SUCCESS:
			return {
				...state,
				ordering: false,
				ordered: true
			}

		case actionTypes.ORDER_FAIL:
			return {
				...state,
				error: action.error
			}

		default:
			return state;
	}
}

export default cartReducer;