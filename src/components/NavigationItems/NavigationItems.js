import React, { Component } from 'react';
import NavigationItem from './NavigationItem/NavigationItem.js';
import classes from './NavigationItems.module.css';
import { connect } from 'react-redux';
import * as actions from "../../store/actions/auth";

class NavigationItems extends Component {
	render() {
		const itemsInCart = this.props.itemsInCart ? <span>({this.props.itemsInCart.length})</span> : null
		return (

			<ul className={classes.NavigationItems}>
				<div className={classes.mainBlock}>
					<NavigationItem link='/home' exact>Home page</NavigationItem>
					<NavigationItem link='/goods' >Goods</NavigationItem>
				</div>
				<div className={classes.mainBlock}>
					<NavigationItem link='/cart' >Cart {itemsInCart} </NavigationItem>
					{this.props.isLogedin ? <NavigationItem link='/orders' >Orders </NavigationItem> : null}
					<NavigationItem link='/auth' ><span onClick={this.props.onLogout} >{this.props.isLogedin ? "Logout" : "Login"}</span></NavigationItem>
				</div>
			</ul>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		itemsInCart: state.cart.itemsInCart,
		isLogedin: state.auth.isLogedin
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
