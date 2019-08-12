import React, { Component } from 'react';
import Good from './Good/Good';
import Search from '../Search/Search';
import classes from './Goods.module.css';
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


	handleSearch = (e) => {
		var searchQuery = e.target.value;

		if (e.keyCode === 13) {
			const searchedGoods = this.state.goodsBackup.filter((good) => {
				return good.brand.toLowerCase().indexOf(searchQuery) !== -1 ||
					good.specifications.display.toLowerCase().indexOf(searchQuery) !== -1 ||
					good.model.toLowerCase().indexOf(searchQuery) !== -1
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

	clickedGoodHandler = (item) => {
		localStorage.setItem("clickedGoodId", item.id)
	}


	render() {
		let goodItems;
		if (this.state.isLoading) {
			goodItems = <Spinner />
		} else {
			if (this.state.goods.length === 0) {
				goodItems = <p> No search results! </p>
			} else {

				goodItems = this.state.goods.map(item => {
					return (
						<Good
							{...this.props}
							key={item.id}
							item={item}
							clicked={() => this.clickedGoodHandler(item)}
						/>
					)
				});
			}
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


export default Goods;


