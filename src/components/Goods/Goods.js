import React, { Component } from 'react';
//import GoodsJSON from '../../goods.json';
import Good from './Good/Good';
import Search from '../Search/Search';
import classes from './Goods.module.css';
import { withRouter } from 'react-router-dom';

class Goods extends Component {
	// state = {
	// 	//goods: GoodsJSON,
	// 	clickedGood: null
	// }

	changeLocation = (e, item) => {
		//console.log(e.target, item)
		if (e.target.tagName !== 'BUTTON') {
			this.props.history.push({ pathname: '/goods/:' + item.id })
		}
	}


	render() {
		let goodItems = this.props.goods.map(item => {
			return (
				<Good
					{...this.props}
					key={item.id}
					item={item}
					clicked={(e) => {
						this.props.showGood(item)
						this.changeLocation(e, item)
					}}
					add={this.props.addToCart.bind(null)}
				/>
			)
		})


		return (
			<div>
				<Search onSearch={this.props.handleSearch.bind(null)} />
				<div className={classes.GoodsGrid}>

					{goodItems}
				</div >
			</div>
		)
	}
}



export default withRouter(Goods);


