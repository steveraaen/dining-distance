import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
/*import './CompStyles.css';*/

export default class HotelList extends Component {
	
	constructor(props) {
		super(props)
		this.state={
			activeColor: 'white',
			opacity: 1
		}		
		this.handleHotelClick = this.handleHotelClick.bind(this)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
	}

	handleHotelClick(lo, la, nm) {
	console.log(lo, la, nm)
		const { getRestaurants, getIso, getMapAndIso } = this.props		
 		getRestaurants(lo, la)
		getIso(lo, la, this.props.curHotel)
	}
	handleMouseEnter(n) {	
		n.properties.opacity = .8		
		n.properties.color = "yellow"	
		this.props.expandCircle(n)
	}


	render() {

		if(this.props.hotelsGeoJSON) {
		var hotels = this.props.hotelsGeoJSON.map((nm, idx) => {
			var initColor = nm.properties.ratingCol
			return(<button style={{ color: "coral", backgroundColor: initColor, fontSize: "1vw", overflow: 'ellipsis'}} key={idx} onMouseEnter={() => this.handleMouseEnter(nm)} onClick={() => this.handleHotelClick(nm.geometry.coordinates[0], nm.geometry.coordinates[1], this.props.city)}>{nm.properties.name}</button>)
		})
	} else { 
		 hotels = (<div>Nothing to show</div>) 
		return  hotels 
	}
		return (	
<div>
      <Collapsible trigger={"Hotels in " + this.props.city} triggerStyle={{color: 'coral', fontSize: '1.8vw', textAlign: 'center', fontWeight: 600}}  >
      <div style={{padding: '1vh', display: 'flex', flexDirection: 'column'}}>
  			{hotels}
  		</div>
     </Collapsible>	
     </div>	
			)
	}
}


























