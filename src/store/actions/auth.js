import * as actionTypes from "./actions";
import axios from 'axios';


export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId
	}
}

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}



export const checkAuthTimeout = (expirationTime) => {
	console.log(expirationTime)
	return dispacth => {
		setTimeout(() => {
			dispacth(logout())
		}, expirationTime * 1000)
	}
}

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		console.log(authData)

		let defaultUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKNyVn4_UEWXiqTKmN17Loz2QaN5e3ZAQ";

		if (!isSignup) {
			defaultUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKNyVn4_UEWXiqTKmN17Loz2QaN5e3ZAQ";
		}


		axios.post(defaultUrl, authData)
			.then(res => {
				console.log(res)
				dispatch(authSuccess(res.data.idToken, res.data.localId))
				dispatch(checkAuthTimeout(res.data.expiresIn))
			})
			.catch(err => {
				console.log(err)
				dispatch(authFail(err.response.data.error))
			})
	}
}