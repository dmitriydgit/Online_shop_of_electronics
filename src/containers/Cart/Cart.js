import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Cart.module.css';
import { connect } from 'react-redux';
import { removeFromCart, clearCart, initOrdering } from '../../store/actions/cart';
import { setAuthRediretPath } from '../../store/actions/auth';
import { createUniqId } from "../../shared/utility";
import ContactData from "../../components/ContactData/ContactData";


class Cart extends Component {


	changeLocation = (e) => {
		if (e.target.tagName === 'BUTTON') {
			this.props.history.push({ pathname: '/goods/' })
		}
	}

	createUniqId = () => {
		return Math.random().toString(36).substr(2, 16);
	}

	orderHandler = () => {
		if (this.props.token && this.props.itemsInCart.length > 0) {
			this.props.onOrdering()
		} else {
			this.props.onSetAuthRediretPath('/cart')
			this.props.history.push('/auth')
		}
	}

	render() {
		let empty = this.props.itemsInCart.length > 0 ? null : < div >Your cart is empty!	</div >
		if (this.props.ordered) {
			empty = <h3 style={{ color: "rgb(119, 170, 49)" }}>Order placed!</h3>
		}
		let goodsInCart = this.props.itemsInCart.map(
			item => {
				return (
					<li key={createUniqId()}>
						<div className={classes.CartItem}>
							<p>{item.brand}  </p>
							<p>{item.price} euro</p>
							<Button btnType='Danger' clicked={() => this.props.onItemRemoved(item)}>Delete</Button>

						</div>
					</li>
				)
			}
		)

		let ordering = null;
		if (this.props.ordering) {
			ordering = <ContactData />
		}

		return (
			<div>
				<h3>Your orders:</h3>
				<ol>
					{goodsInCart}
				</ol>
				{empty}
				<div className={classes.Buttons}>
					<Button btnType='Success' clicked={this.changeLocation}>Back to goods list!</Button>
					<Button btnType='Danger' clicked={this.props.onClearCart}>Clear cart</Button>
					<Button btnType='Primary' clicked={this.orderHandler}> {this.props.token ? "Order!" : "SignIn to order!"}</Button>
				</div>
				{ordering}
			</div >

		)
	}
}

const mapStateToProps = (state) => {
	return {
		itemsInCart: state.cart.itemsInCart,
		ordering: state.cart.ordering,
		ordered: state.cart.ordered,
		token: state.auth.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onItemRemoved: (item) => dispatch(removeFromCart(item)),
		onClearCart: () => dispatch(clearCart()),
		onOrdering: () => dispatch(initOrdering()),
		onSetAuthRediretPath: (path) => dispatch(setAuthRediretPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);