import React, { Component } from 'react';
//import classes from './Good.module.css';
//import * from '../../../assets/'


class FullGoodInfo extends Component {
	render() {
		console.log(this.props.good)
		return (
			<div >
				{/* <img className={classes.CardImg} src={this.props.url} alt={this.props.brand} />
				<h4> {this.props.brand}</h4>
				<p>Price: {this.props.price} EURO</p>
				<div className={classes.Button}>
					<button onClick={this.props.add} >
						<img
							src="https://static1.squarespace.com/static/56ab643c7086d71a07aa961b/t/56abc80640667a040036afc9/1454098443818/shopping-cart.png"
							alt='add to cart'
							style={{ width: '20px', heigth: "auto", textAlign: 'right' }}
						/> </button>
				</div> */}
				Hello!

			</div>

		)
	}
}



export default FullGoodInfo;