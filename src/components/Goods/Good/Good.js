import React, { Component } from 'react';
import classes from './Good.module.css';
import Button from '../../../components/UI/Button/Button';
import { createBrowserHistory } from 'history';
//import Aux from '../../HOC/Aux'

const history = createBrowserHistory();


class Good extends Component {

	goBack = () => {
		history.goBack();
	}

	render() {
		return (
			<div onClick={this.props.clicked}>
				<div className={this.props.clickedGood ? classes.ClickedCard : classes.Card}>
					<img className={this.props.clickedGood ? classes.ClickedCardImg : classes.CardImg} src={this.props.item.url} alt={this.props.item.brand} />

					<div className={classes.CardDescription}>

						<h4> {this.props.item.brand}</h4>
						<p>Price: {this.props.item.price} EURO</p>
						<div className={classes.Button}>
							<Button btnType='Success' clicked={(e) => this.props.add(this.props.item, e)} >
								Add to cart </Button>
						</div>
					</div>
				</div>

				{this.props.clickedGood ? <Button btnType='Success' className={classes.GoBackBtn} clicked={this.goBack}>Back to goods list</Button> : null}
			</div>

		)
	}
}



export default Good;

//id={this.props.item.id}