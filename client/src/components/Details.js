import React, { Component } from 'react';
import RestaurantStats from './RestaurantStats.js'
import './CompStyles.css';

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {

        if (this.props.curHotel) {
             
            return (
               
					<div style={{padding: '1vw', color: 'yellow', textAlign: 'center', backgroundColor: 'rgba(0,0,0,.6)',  borderWidth: '5px', borderColor: 'red', borderRadius: '.8vw' }}>
						
                        <h1>{this.props.curHotel.properties.name}</h1>
						<h2>{this.props.curHotel.properties.location.address1}</h2>
						<h3>Yelp Rating: {this.props.curHotel.properties.rating}</h3>
						<span className="price">Cost: {this.props.curHotel.properties.price}</span>			
					</div>						
				
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}