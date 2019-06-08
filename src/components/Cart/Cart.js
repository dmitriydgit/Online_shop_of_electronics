import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import classes from './Cart.module.css';
//import Aux from '../HOC/Aux';


class Cart extends Component {


	changeLocation = (e) => {
		//console.log(this.props, e.target)
		if (e.target.tagName === 'BUTTON') {
			this.props.history.push({ pathname: '/goods/' })
		}
	}

	render() {
		//	console.log(this.props.choosedGoods)
		const empty = this.props.choosedGoods.length > 0 ? null : < div >Your cart is empty!	</div >
		let goodsInCart = this.props.choosedGoods.map(
			item => {
				return (
					<li key={item.uniqueId}>
						<div className={classes.CartItem}>
							<p>{item.brand}  </p>
							<p>{item.price} euro</p>
							<Button btnType='Danger' clicked={() => this.props.deleteCartItem(item)}>Delete</Button>

						</div>
					</li>
				)
			}
		)

		return (
			<div>
				<h3>Your orders:</h3>
				<ol>
					{goodsInCart}
				</ol>
				{empty}
				<div className={classes.Buttons}>
					<Button btnType='Success' clicked={this.changeLocation}>Back to goods list!</Button>
					<Button btnType='Primary' clicked={this.props.ordered}>To order!</Button>
					<Button btnType='Danger' clicked={this.props.clearCart}>Clear cart</Button>
				</div>
			</div >

		)
	}
}



export default Cart;