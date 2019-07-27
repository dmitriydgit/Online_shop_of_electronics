import React, { Component } from 'react';
import Good from './Good/Good';
import Search from '../Search/Search';
import classes from './Goods.module.css';
import { withRouter } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';

class Goods extends Component {
	state = {
		isLoading: true,
		goods: null,
		goodsBackup: null
	}

	componentDidMount() {
		this.setState({
			isLoading: true
		})
		axios.get('https://my-e-shop-bb02e.firebaseio.com/Goods.json')
			.then(res => {
				this.setState({
					goods: res.data,
					goodsBackup: res.data,
					isLoading: false
				})
			})
			.catch(err => console.log(err))
	}

	changeLocation = (e, item) => {
		if (e.target.tagName !== 'BUTTON') {
			this.props.history.push({ pathname: '/goods/:' + item.id })
		}
	}

	handleSearch = (e) => {
		var searchQuery = e.target.value;

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


	render() {

		let goodItems;
		if (this.state.isLoading) {
			goodItems = <Spinner />
		} else {
			goodItems = <p> In process! </p>
			goodItems = this.state.goods.map(item => {
				return (
					<Good
						{...this.props}
						key={item.id}
						item={item}
						clicked={(e) => {
							this.props.clickedGood(item)
							this.changeLocation(e, item)
						}}
						add={this.props.addToCart.bind(null)}
					/>
				)
			});
		}

		return (
			<div>
				<Search onSearch={this.handleSearch} />
				<div className={classes.GoodsGrid}>
					{goodItems}
				</div >
			</div>
		)
	}
}



export default withRouter(Goods);


