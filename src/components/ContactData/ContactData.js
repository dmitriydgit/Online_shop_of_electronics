import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/cart';



class ContactData extends Component {
	state = {
		controls: {
			name: {
				value: '',
				validation: {
					required: true
				},
				valid: false,
			},
			street: {
				value: '',
				validation: {
					required: true
				},
				valid: false,
			},
			zip: {
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
			},
			country: {
				value: '',
				validation: {
					required: true
				},
				valid: false,
			},
			email: {
				value: '',
				validation: {
					required: true
				},
				valid: false,
			},
		},
		formIsValid: false
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

		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}

		this.setState({
			controls: updatedControls,
			formIsValid: formIsValid
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

		let formData = {};
		const controls = { ...this.state.controls }

		for (let inputIdentifier in controls) {
			formData[inputIdentifier] = controls[inputIdentifier].value;
		}

		const orderData = {
			userInfo: formData,
			orderInfo: this.props.itemsInCart
		}
		this.props.onOrder(orderData);
	}

	render() {

		let form =
			<form onSubmit={this.submitHandler} >
				<input className={classes.Input} id="name" type="text" placeholder="Name" onChange={(e) => { this.inputChangeHandler(e) }}></input>
				<input className={classes.Input} id="street" type="text" placeholder="Street" onChange={(e) => { this.inputChangeHandler(e) }}></input>
				<input className={classes.Input} id="zip" type="text" placeholder="ZIP code" onChange={(e) => { this.inputChangeHandler(e) }}></input>
				<input className={classes.Input} id="country" type="text" placeholder="Country" onChange={(e) => { this.inputChangeHandler(e) }}></input>
				<input className={classes.Input} id="email" type="email" placeholder="Email" onChange={(e) => { this.inputChangeHandler(e) }}></input>

				<Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
			</form>

		let error = null;
		if (this.props.error) {
			error = <h3 style={{ color: "red" }}>{this.props.error.message}</h3>;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter Your contact data</h4>
				{error}
				{form}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		itemsInCart: state.cart.itemsInCart,
		ordering: state.cart.ordering,
		ordered: state.cart.ordered,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrder: (orderData, token) => dispatch(actions.orderGoods(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);



