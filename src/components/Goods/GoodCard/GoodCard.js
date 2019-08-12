import React, { Component } from 'react';
import classes from './GoodCard.module.css';
import Button from '../../UI/Button/Button';
import { createBrowserHistory } from 'history';
import Aux from '../../../HOC/Aux';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
//import * as actionTypes from '../../../store/actions/actions';
import { addToCart } from '../../../store/actions/cart';


const history = createBrowserHistory();


class GoodCard extends Component {
	state = {
		itemId: null,
		isLoading: true,
		item: null
	}

	componentDidMount() {
		// console.log(this.props.item.id)
		let itemId = localStorage.getItem('clickedGoodId')
		this.setState({
			itemId: itemId,
			isLoading: true
		})

		axios.get('https://my-e-shop-bb02e.firebaseio.com/Goods/' + itemId + '.json')
			.then(response => {
				this.setState({
					item: response.data,
					isLoading: false
				})
			})
			.catch(error => {
				console.log(error);
			})
	}

	goBack = () => {
		history.goBack();
	}

	render() {
		console.log(this.props)
		let card;
		if (this.state.isLoading) {
			card = <Spinner />
		} else {
			card = <div>
				<div className={classes.ClickedCard}>
					<img className={classes.ClickedCardImg} src={this.state.item.url} alt={this.state.item.brand} />

					<div className={classes.CardDescription}>
						<h4> {this.state.item.brand} {this.state.item.model} {this.state.item.specifications.display}</h4>
						<div className={classes.cardSpecification}>
							<ul>
								<li>HDD: {this.state.item.specifications.HDD}</li>
								<li>RAM: {this.state.item.specifications.RAM}</li>
								<li>Display: {this.state.item.specifications.display}</li>
								<li>Graphics card: {this.state.item.specifications.graphics_card}</li>
								<li>Operating system: {this.state.item.specifications.operating_system}</li>
								<li>Processor: {this.state.item.specifications.processor}</li>
								<li>Wireless: {this.state.item.specifications.wireless}</li>
								<li>Warranty: {this.state.item.specifications.warranty}</li>
							</ul>
						</div>
						<p><b>Price:</b> {this.state.item.price} EURO</p>
						<div className={classes.Button}>
							<Button btnType='Success' clicked={(e) => this.props.onItemAdded(this.state.item, e)} >
								Add to cart </Button>
						</div>
					</div>
				</div>

				<Button btnType='Success' className={classes.GoBackBtn} clicked={this.goBack}>Back to goods list</Button>
			</div >
		}



		return (
			<Aux>
				{card}
			</Aux>
		)
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		onItemAdded: (item) => dispatch(addToCart(item)),
	}
}

export default connect(null, mapDispatchToProps)(GoodCard);
