import React, { Component } from "react";
import classes from "./Search.module.css";

class Search extends Component {

	render() {
		return (
			<div>
				<input
					type='text'
					className={classes.SearchField}
					placeholder='Search...'
					onKeyUp={this.props.onSearch}
				/>
			</div>
		)
	}
}

export default Search;