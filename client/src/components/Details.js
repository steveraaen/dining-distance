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
               
					<div style={{padding: '1vw', color: 'white', textAlign: 'center',  backgroundColor: "rgba(0,0,0,.3)",borderWidth: '.4vw', borderColor: 'red', borderRadius: '.8vw' }}>
						
                        <h2>{this.props.curHotel.properties.name}</h2>
						<h3>{this.props.curHotel.properties.location.address1}</h3>
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