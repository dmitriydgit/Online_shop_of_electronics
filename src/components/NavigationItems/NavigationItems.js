import React, { Component } from 'react';
import NavigationItem from './NavigationItem/NavigationItem.js';
import classes from './NavigationItems.module.css'

class NavigationItems extends Component {
	render() {
		const itemsInCart = this.props.itemsInCart ? <span>({this.props.itemsInCart})</span> : null
		return (

			<ul className={classes.NavigationItems}>
				<div className={classes.mainBlock}>
					<NavigationItem link='/home' exact>Home page</NavigationItem>
					<NavigationItem link='/goods' >Goods</NavigationItem>
				</div>
				<div>
					<NavigationItem className={classes.cart} link='/cart' >Cart {itemsInCart} </NavigationItem>
				</div>
			</ul>

		)
	}
}


export default NavigationItems;
