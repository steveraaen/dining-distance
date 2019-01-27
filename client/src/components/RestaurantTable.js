import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import Collapsible from 'react-collapsible';
import './CompStyles.css';






export default class RestaurantTableB extends Component {
	constructor(props) {
		super(props)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)

	}


	handleMouseEnter(rst) {
		this.props.expandRestCircle(rst)
	}
	render() {

	
        if (this.props.dtls && this.props.resGeoObj) {     
         var deets = this.props.resGeoObj.features.map((place, idx) => {

             return (
            <tr key={idx} onMouseEnter={() => this.handleMouseEnter(place)} style={{color: 'white', backgroundColor: place.properties.ratingCol, fontSize: '1.2vw'}}>
					<td>{Math.floor(place.properties.distance) + " M"}</td>
					<td>{place.properties.rating}</td>
					<td style={{textOverflow: 'ellipsis'}}>{place.properties.name}</td>
					<td>{place.properties.review_count}</td>
					<td>{place.properties.price}</td>
				</tr>)
          })
        } else {
            deets =  (<tr><th>Nothing to show</th></tr>) 
        } if(this.props.dtls) {
        		return(
					
					<div style={{height: '94vh', overflow: 'scroll', width: '28vw', backgroundColor: "rgba(0,0,0,.4)"}}>	
					<Collapsible trigger = "Nearby Restaurants" triggerStyle={{color: 'coral', fontSize: '1.8vw', textAlign: 'center'}}>			
						<Table>						
						<thead style={{backgroundColor: 'rgba(0,0,0,.4)', color: 'white'}}>	
							<tr>
								<th>Distance</th>
								<th>Rating</th>
								<th>Name</th>
								<th>Yelp Reviews</th>
								<th>Price</th>
							</tr>
						</thead>					
							<tbody>
							{deets}
							</tbody>
				
					</Table>
					</Collapsible>
				</div>
					)
        	} else {return <div></div>}

	}
}