import React, { Component } from 'react';
import classes from './Good.module.css';
import Button from '../../../components/UI/Button/Button';
import { createBrowserHistory } from 'history';
//import Aux from '../../../HOC/Aux';
//import axios from 'axios';

const history = createBrowserHistory();


class Good extends Component {

	componentDidMount() {
		//console.log(this.props.item.id)
		// axios.get('https://my-e-shop-bb02e.firebaseio.com/Goods.json', {
		// 	params: {
		// 		id: 1
		// 	}
		// })
		// 	.then(response => {
		// 		console.log(response.data);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	})

	}

	goBack = () => {
		history.goBack();
	}

	render() {

		return (
			<div onClick={this.props.clicked}>
				<div className={classes.Card}>
					<img className={classes.CardImg} src={this.props.item.url} alt={this.props.item.brand} />
					<div className={classes.CardDescription}>
						<h4> {this.props.item.brand} {this.props.item.model} {this.props.item.specifications.display}</h4>
						<p><b>Price:</b> {this.props.item.price} EURO</p>
						<div className={classes.Button}>
							<Button btnType='Success' clicked={(e) => this.props.add(this.props.item, e)} >
								Add to cart </Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}



export default Good;

//id={this.props.item.id}