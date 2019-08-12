import React, { Component } from 'react';
import classes from './Button.module.css';
//import * from '../../../assets/'


class Button extends Component {
	render() {
		//console.log(this.props)
		return (
			<button
				className={[classes.Button, classes[this.props.btnType]].join(' ')}
				onClick={this.props.clicked} disabled={this.props.disabled}>
				{this.props.children}
			</button>

		)
	}
}



export default Button;