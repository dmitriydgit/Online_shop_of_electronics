import React, { Component } from 'react';
import './App.css';
import NavigationItems from './components/NavigationItems/NavigationItems';
import Home from './components/Home/Home';
import Goods from './components/Goods/Goods';
import GoodCard from './components/Goods/GoodCard/GoodCard';
import Orders from './components/Orders/Orders';
import Cart from './containers/Cart/Cart'
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import { connect } from "react-redux";


class App extends Component {
	state = {
		clickedGood: null,
	}

	render() {

		return (
			<div className="App" >
				<header>
					<NavigationItems />
				</header>

				<Switch>
					<Route path='/home' render={(props) => <Home	{...props} />} />
					<Route path='/goods/:id' render={(props) => <GoodCard {...props} />} />
					<Route path='/goods' exact render={(props) => <Goods {...props} />} />
					<Route path='/cart' render={(props) => <Cart {...props} />} />
					{this.props.token ? <Route path='/orders' render={(props) => <Orders {...props} />} /> : null}
					<Route path='/auth' component={Auth} />
					<Redirect exact from='/' to='home' />
					<Route render={() => <h1>Not Found!</h1>} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps, null)(App);



// addToCartItemHandler = (item, e) => {
	// 	if (e.target.tagName === 'BUTTON') {
	// 		const choosedGoods = [...this.state.choosedGoods];
	// 		const newItem = { ...item };
	// 		newItem.uniqueId = Math.random().toString(36).substr(2, 16);
	// 		choosedGoods.push(newItem);
	// 		this.setState({
	// 			choosedGoods: choosedGoods
	// 		})
	// 	}
	// }

	// deleteCartItemHandler = (item) => {
	// 	const choosedGoods = [...this.state.choosedGoods];
	// 	const newGoods = choosedGoods.filter(good => {
	// 		return good.uniqueId !== item.uniqueId
	// 	})
	// 	this.setState({
	// 		choosedGoods: newGoods
	// 	})
	// }

	// clearCartHandler = (e) => {
	// 	//console.log(e.target)
	// 	const choosedGoods = [];
	// 	this.setState({
	// 		choosedGoods: choosedGoods
	// 	})
	// }