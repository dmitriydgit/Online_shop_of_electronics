import React, { Component } from 'react';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';


class Home extends Component {

	changeLocation = () => {
		this.props.history.push('/goods');
	}


	render() {

		return (
			<div className={classes.About}>
				<h3>Online Store Rosetka ™</h3>
				<p>
					Are you interested in household appliances, computers, software or products for outdoor activities? All this you can buy right now, saving a lot of time! The online store Rozetka ™ will happily help you avoid having to visit dozens of stores. You can order any product without getting up from your chair, and our courier will deliver the purchase on time to the specified address. The online store (Ukraine) Rozetka ™ operates throughout the country. Residents of any cities can easily visit our online store (Kharkov, Kiev and other cities).
				</p>

				<p>
					Regardless of where you are at the moment, you can order a product that, you see, is very convenient. What are the advantages offered by our online store of electronics, phones and other products? The most significant fact is the presence of thousands of items that are guaranteed to be in stock. You can visit our online store and buy any goods at a low price. Do you need a refrigerator, washing machine or microwave?
				</p>

				<p>Online store of household appliances (Kiev, Kharkov) will help you. The presence of a variety of solutions will allow you to choose a device with the required characteristics and cost. Online store of equipment (Kharkiv, Dnepropetrovsk) Rozetka is a variety of offers for every taste. To order a product, you do not have to go anywhere or go, because All operations are performed in virtual mode. That is why Rozetka is an online store of TVs, refrigerators and other equipment, where buying is profitable and pleasant.
				</p>

				<p>It often happens that we urgently need to buy a cell phone when we lose our own phone, or to please a loved one with a pleasant gift. In this case, you just need to contact the online mobile phone store Rozetka ™. Hundreds of models from leading manufacturers are offered to your attention. Ordering mobile phones in our online store can be made from any city (Kiev, Kharkov, Odessa, etc.) without even leaving your home. This will remove from your shoulders a lot of problems, and allow you to get a communication tool in time, without which it is extremely difficult to manage these days.
				</p>

				<p>And, of course, we must not forget about computers, laptops and peripherals. The online laptop store Rozetka ™ offers the widest selection of laptops. You can easily pick up the device for work or entertainment. Our online store (Ukraine) computer technology cooperates with leading global manufacturers. By visiting our online store of laptops and computer equipment, you can easily get the best solutions from the most famous companies.
				</p>

				<p>In addition to all of the above, the online store (Ukraine) Rozetka ™ has dozens of other sections. MP3 players, products for children and teenagers, accessories for tourism, fishing and hunting are all contained in the catalog. To make an order in the online store of equipment Rozetka, it is enough to perform a few simple steps. Choose a product, click the "Buy" button and fill out a simple order form, after which the courier will deliver the purchase to the address you specify. You can pay for your order in the online store (Kharkiv, Dnepropetrovsk, Odessa and other cities) in the way that is most convenient for you. You can pay cash courier online store in Kiev.</p>


				<Button btnType='Success' clicked={this.changeLocation}>Go to goods catalogue! </Button>



			</div>

		)
	}
}



export default Home;