import React, { Component } from 'react';
import classes from './Carusel.module.css';
import Good from '../../components/Goods/Good/Good';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import { createUniqId } from '../../shared/utility';


class Carusel extends Component {

	state = {
		properties: null,
		property: null,
		isLoading: false
	}

	componentDidMount() {
		this.setState({
			isLoading: true
		})
		axios.get('https://my-e-shop-bb02e.firebaseio.com/Goods.json')
			.then(res => {
				const data = [...res.data];
				data.map((item => {
					return item.index = item.id;
				}))
				this.setState({
					properties: data,
					property: data[0],
					// goodsBackup: res.data,
					isLoading: false
				})
			})
			.catch(err => console.log(err))
	}

	nextProperty = () => {
		const newIndex = this.state.property.index + 1;
		this.setState({
			property: this.state.properties[newIndex]
		})
	}

	prevProperty = () => {
		const newIndex = this.state.property.index - 1;
		this.setState({
			property: this.state.properties[newIndex]
		})
	}

	render() {
		const { properties, property } = this.state;


		let carusel;
		if (this.state.properties) {
			carusel =
				<div className={classes.Carusel}>

					<button
						onClick={() => this.nextProperty()}
					// disabled={property.index === this.state.properties.length - 1}
					>Next</button>
					<button
						onClick={() => this.prevProperty()}
					// disabled={property.index === 0}
					>Prev</button>

					<div className={classes.page}>

						<div className={classes.col}>

							<div className={classes.cards_slider}>
								<div className={classes.cards_slider_wrapper}>
									{
										properties.map(property => <Good key={createUniqId()} item={property} />)
									}
								</div>
							</div>
						</div>

					</div>
				</div>
		}

		if (!this.state.properties) {
			carusel = <Spinner />
		}

		console.log(this.state.properties)

		return (
			<div>
				Carusel
			{carusel}
			</div>
		);
	}
}

export default Carusel;
