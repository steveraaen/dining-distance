import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import Test from './Test.js';

export default class RatingKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {
		
	
			return(
<div>				
				<Collapsible trigger="Ratings Key" >				
					<div style={{flex: 1, flexDirection: 'column'}}>
						<div style={{backgroundColor: this.props.rgbArr[8], flex: .1, color: "white"}}>5</div>

						<div style={{backgroundColor: this.props.rgbArr[6], flex: .1, color: "white"}}>4</div>

						<div style={{backgroundColor: this.props.rgbArr[4], flex: .1, color: "white"}}>3</div>

						<div style={{backgroundColor: this.props.rgbArr[2], flex: .1, color: "white"}}>2</div>

						<div style={{backgroundColor: this.props.rgbArr[0], flex: .1, color: "white"}}>1</div>
					</div>
					</Collapsible>
		</div>
				)
		
	}
}
