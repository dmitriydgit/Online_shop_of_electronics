import React, { Component } from 'react';
import classes from './Good.module.css';
import Button from '../../../components/UI/Button/Button';
import { createBrowserHistory } from 'history';
//import Aux from '../../../HOC/Aux';

const history = createBrowserHistory();


class Good extends Component {

	goBack = () => {
		history.goBack();
	}

	render() {

		let specifications = <div className={classes.cardSpecification}>
			<ul>
				<li>HDD: {this.props.item.specifications.HDD}</li>
				<li>RAM: {this.props.item.specifications.RAM}</li>
				<li>Display: {this.props.item.specifications.display}</li>
				<li>Graphics card: {this.props.item.specifications.graphics_card}</li>
				<li>Operating system: {this.props.item.specifications.operating_system}</li>
				<li>Processor: {this.props.item.specifications.processor}</li>
				<li>Wireless: {this.props.item.specifications.wireless}</li>
				<li>Warranty: {this.props.item.specifications.wireless}</li>
			</ul>
		</div>

		if (!this.props.clickedGood) {
			specifications = null
		}
		//console.log(this.props)

		return (
			<div onClick={this.props.clicked}>
				<div className={this.props.clickedGood ? classes.ClickedCard : classes.Card}>
					<img className={this.props.clickedGood ? classes.ClickedCardImg : classes.CardImg} src={this.props.item.url} alt={this.props.item.brand} />

					<div className={classes.CardDescription}>
						<h4> {this.props.item.brand} {this.props.item.model} {this.props.item.specifications.display}</h4>
						{specifications}
						<p><b>Price:</b> {this.props.item.price} EURO</p>
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