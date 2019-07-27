import React, { Component } from 'react';
import './App.css';
import NavigationItems from './components/NavigationItems/NavigationItems';
import Home from './components/Home/Home';
import Goods from './components/Goods/Goods';
import GoodCard from './components/Goods/GoodCard/GoodCard';
import Cart from './components/Cart/Cart'
import { Route, Switch, Redirect } from 'react-router-dom';
//import FullGoodInfo from './components/FullGoodInfo/FullGoodInfo';
//import Good from './components/Goods/Good/Good';
//import Aux from './HOC/Aux';
//import GoodsJSON from './goods.json';
// import axios from 'axios';
// import Spinner from './components/UI/Spinner/Spinner'

//const history = createBrowserHistory();

class App extends Component {
	state = {
		choosedGoods: [],
		clickedGood: null,
		isLoading: false
	}

	addToCartItemHandler = (item, e) => {
		if (e.target.tagName === 'BUTTON') {
			const choosedGoods = [...this.state.choosedGoods];
			const newItem = { ...item };
			newItem.uniqueId = Math.random().toString(36).substr(2, 16);
			choosedGoods.push(newItem);
			this.setState({
				choosedGoods: choosedGoods
			})
		}
	}

	deleteCartItemHandler = (item) => {
		const choosedGoods = [...this.state.choosedGoods];
		const newGoods = choosedGoods.filter(good => {
			return good.uniqueId !== item.uniqueId
		})
		this.setState({
			choosedGoods: newGoods
		})
	}

	clearCartHandler = (e) => {
		//console.log(e.target)
		const choosedGoods = [];
		this.setState({
			choosedGoods: choosedGoods
		})
	}

	clickedGoodHandler = (item) => {
		this.setState({
			clickedGood: item
		})
		localStorage.setItem("clickedGoodId", item.id)
		console.log(item.id)
	}

	orderHandler = () => {
		if (this.state.choosedGoods.length > 0) {
			console.log('Ordered!')
		} else {
			console.log('Nothing to order!')
		}
		//axios.post(this.addToCartItemHandler.choosedGoods)
	}

	render() {

		return (
			<div className="App" >
				<header>
					<NavigationItems itemsInCart={this.state.choosedGoods.length} />
				</header>

				<Switch>
					<Route path='/home' render={(props) => <Home	{...props} />} />
					<Route path='/goods/:id' render={(props) => (
						<GoodCard
							{...props}
							addToCart={this.addToCartItemHandler}
						/>)} />
					<Route path='/goods' exact render={(props) => (
						<Goods
							{...this.props}
							clickedGood={this.clickedGoodHandler}
							addToCart={this.addToCartItemHandler}
						//handleSearch={this.searchHandler}
						/>
					)} />

					<Route path='/cart' render={(props) => (
						<Cart
							{...props}
							choosedGoods={this.state.choosedGoods}
							deleteCartItem={this.deleteCartItemHandler}
							clearCart={this.clearCartHandler}
							ordered={this.orderHandler}
						/>
					)} />

					<Redirect exact from='/' to='home' />
					<Route render={() => <h1>Not Found!</h1>} />
				</Switch>
			</div>
		);
	}
}

export default App;
