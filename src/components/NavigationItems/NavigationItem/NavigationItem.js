import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css'

class NavigationItem extends Component {
	render() {
		return (
			<li className={classes.NavigationItem}>
				<NavLink activeClassName={classes.active} to={this.props.link}>{this.props.children}</NavLink>
			</li >
		)
	}
}


export default NavigationItem;

//activeClassName={classes.active}