import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';


class Auth extends Component {

	state = {
		controls: {
			email: {
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false
			},
			password: {
				value: "",
				validation: {
					required: true,
					minLength: 6
				},
				valid: false
			}
		},
		isSignup: false
	}


	inputChangeHandler = (event) => {
		let controlId = event.target.id;
		const updatedControls = {
			...this.state.controls,
			[controlId]: {
				...this.state.controls[controlId],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlId].validation)
			}
		};
		this.setState({
			controls: updatedControls
		})
	}


	checkValidity = (value, rules) => {
		let isValid = true;
		if (!rules) {
			return true
		}
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				isSignup: !prevState.isSignup
			}
		})
	}

	render() {
		let form =
			<form onSubmit={this.submitHandler}>
				<input id="email" type="email" placeholder="Email" onChange={(e) => { this.inputChangeHandler(e) }}></input>
				<input id="password" type="password" placeholder="Password" onChange={(e) => { this.inputChangeHandler(e) }}></input>
				<Button btnType="Success" >Submit</Button>
			</form>

		if (this.props.loading) {
			form = <Spinner />
		}

		let error = null;
		if (this.props.error) {
			error = <h3 style={{ color: "red" }}>{this.props.error.message}</h3>;
		}

		let redirectPath = null;
		if (this.props.isAuthentificated) {
			redirectPath = <Redirect to='/goods' />
		}

		return (
			<div>
				<h2>{this.state.isSignup ? "Please, SignUp!" : "Please, SignIn!"}</h2>
				{error}
				{redirectPath}
				{form}
				<Button btnType="Success"
					clicked={this.switchAuthModeHandler}
				>Switch to: {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthentificated: state.auth.token !== null,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);


