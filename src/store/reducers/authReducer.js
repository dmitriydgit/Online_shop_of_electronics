import * as actionTypes from "../actions/actions";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	isLogedin: false

}

const authReducer = (state = initialState, action) => {

	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				error: null,
				loading: true

			}
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.idToken,
				userId: action.userId,
				error: null,
				loading: false,
				isLogedin: true
			}
		case actionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			}
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
				isLogedin: false
			}

		default:
			return state;
	}
}

export default authReducer;