import React, { Component } from 'react';
import classes from './Good.module.css';
import Button from '../../../components/UI/Button/Button';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
//import * as actionTypes from '../../../store/actions/actions';
import { addToCart } from '../../../store/actions/cart';
//import { createUniqId } from '../../../shared/utility'

const history = createBrowserHistory();


class Good extends Component {


	goBack = () => {
		history.goBack();
	}

	changeLocation = (item, e) => {
		if (e.target.tagName !== 'BUTTON') {
			this.props.history.push({ pathname: '/goods/:' + item.id })
		}
	}

	render() {

		return (
			<div onClick={(e) => {
				this.props.clicked(this.props.item)
				this.changeLocation(this.props.item, e)
			}}>
				<div className={classes.Card}>
					<img className={classes.CardImg} src={this.props.item.url} alt={this.props.item.brand} />
					<div className={classes.CardDescription}>
						<h4> {this.props.item.brand} {this.props.item.model} {this.props.item.specifications.display}</h4>
						<p><b>Price:</b> {this.props.item.price} EURO</p>
						<div className={classes.Button}>
							<Button btnType='Success' clicked={() => this.props.onItemAdded(this.props.item)} >
								Add to cart </Button>
						</div>
					</div>
				</div>
			</div >
		)
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		onItemAdded: (item) => dispatch(addToCart(item)),

	}
}



export default connect(null, mapDispatchToProps)(Good);

