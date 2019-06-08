import React, { Component } from 'react';
import Aux from './components/HOC/Aux';
import './App.css';
import NavigationItems from './components/NavigationItems/NavigationItems';
import Home from './components/Home/Home';
import Goods from './components/Goods/Goods';
import Good from './components/Goods/Good/Good';
//import FullGoodInfo from './components/FullGoodInfo/FullGoodInfo';
import Cart from './components/Cart/Cart'
import { Route, Switch, Redirect } from 'react-router-dom';
//import GoodsJSON from './goods.json';
import axios from 'axios';
import Spinner from './components/UI/Spinner/Spinner'

//const history = createBrowserHistory();

class App extends Component {
	state = {
		choosedGoods: [],
		goods: [],
		goodsBackup: [],
		clickedGood: null,
		goodsFirebase: [],
		isLoading: false
	}

	componentDidMount() {
		this.setState({
			isLoading: true
		})
		axios.get('https://my-e-shop-bb02e.firebaseio.com/Goods.json')
			.then(res => {
				setTimeout(() => {
					this.setState({
						goods: res.data,
						goodsBackup: res.data,
						isLoading: false
					})
				}, 2000)


			})
			.catch(err => console.log(err))
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

	showGoodHandler = (item) => {
		this.setState({
			clickedGood: item
		})
	}

	searchHandler = (e) => {
		var searchQuery = e.target.value;
		//console.log(searchQuery)

		if (e.keyCode === 13) {
			const searchedGoods = this.state.goods.filter((good) => {
				return good.brand.toLowerCase().indexOf(searchQuery) !== -1;
			})
			this.setState({
				goods: searchedGoods,
			})
		}
		if (searchQuery.length === 0) {
			this.setState({
				goods: this.state.goodsBackup,
			})
		}
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
		let GoodsLoaded = <Goods
			{...this.props}
			goods={this.state.goods}
			showGood={this.showGoodHandler}
			addToCart={this.addToCartItemHandler}
			handleSearch={this.searchHandler}
		/>;

		if (this.state.isLoading) {
			GoodsLoaded = <Spinner />;
		}


		return (
			<div className="App" >
				<header>
					<NavigationItems itemsInCart={this.state.choosedGoods.length} />
				</header>

				<Switch>
					<Route path='/home' render={(props) => <Home
						{...props}
					/>} />
					<Route
						exact
						path={'/goods/:id'}
						render={() => (
							<Good
								{...this.props}
								clickedGood={this.state.clickedGood}
								item={this.state.clickedGood}
								add={this.addToCartItemHandler}

							/>
						)}
					/>
					<Route path='/goods' exact render={(props) => (
						<Aux>{GoodsLoaded} </Aux>
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

					<Route render={() => <h1>Not Found!</h1>} />
					<Redirect from='/' to='home' />
				</Switch>


			</div>
		);
	}
}

export default App;
