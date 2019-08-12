import React, { Component } from 'react';
//import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/orders';
import { connect } from 'react-redux';
import { createUniqId } from '../../shared/utility';
import Order from './Order/Order'


class Orders extends Component {

	componentDidMount() {
		this.props.onFetchOrders()
	}

	changeLocation = () => {
		this.props.history.push('/goods');
	}


	render() {
		let orders = <Spinner />

		if (this.props.orders) {

			let ordersData = [];
			for (let order in this.props.orders) {
				for (let item in this.props.orders[order]) {
					ordersData = ordersData.concat(this.props.orders[order][item])
				}
			}
			console.log(ordersData)

			orders = ordersData.map((order) => {

				return <Order
					key={createUniqId()}
					orderData={order}
				/>
			})
		}

		return (
			<div >
				<h3>Online Store Rosetka ™ ORDERS</h3>
				{orders}
				<Button btnType='Success' clicked={this.changeLocation}>Go to goods catalogue! </Button>
			</div >

		)
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders.orders,
		loading: state.orders.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);