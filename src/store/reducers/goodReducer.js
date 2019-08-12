import * as actionTypes from "../actions/actions";

const initialState = {
	item: null
}

const goodReducer = (state = initialState, action) => {
	console.log(state)
	switch (action.type) {
		case actionTypes.SHOW_GOOD_DETAIS:
			return {
				...state,
				item: action.item

			}
		default:
			return state;
	}
}

export default goodReducer;