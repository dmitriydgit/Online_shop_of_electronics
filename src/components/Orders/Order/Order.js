import React, { Component } from 'react';


class Order extends Component {

	render() {
		return (
			<div >
				<span> {this.props.orderData.brand} {this.props.orderData.model} {this.props.orderData.specifications.display} - {this.props.orderData.price} EURO 	</span>
			</div>
		)
	}
}

export default Order;