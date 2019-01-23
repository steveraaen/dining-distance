import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import Test from './Test.js';

export default class RatingKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {
		
	
			return(
			<div style={{width: "18vw", backgroundColor: "rgba(0,0,0,.6)", textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold',color: "yellow", paddingTop: "1vw", paddingBottom: "1vw",borderWidth: ".6vw", borderRadius: ".6vw"}}>
				<Collapsible trigger="Ratings Key" >				
					<div style={{flex: 1, flexDirection: 'column'}}>
						<div style={{backgroundColor: this.props.ratingColors[8], flex: .1, color: "white"}}>5</div>

						<div style={{backgroundColor: this.props.ratingColors[6], flex: .1, color: "white"}}>4</div>

						<div style={{backgroundColor: this.props.ratingColors[4], flex: .1, color: "white"}}>3</div>

						<div style={{backgroundColor: this.props.ratingColors[2], flex: .1, color: "white"}}>2</div>

						<div style={{backgroundColor: this.props.ratingColors[0], flex: .1, color: "white"}}>1</div>
					</div>
					</Collapsible>
		</div>
				)
		
	}
}
