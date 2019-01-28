import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

const colors = ["#FAC80A","#e500b1","#269CF2"]

export default class DistanceKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {

		if(this.props.isoList) {
			var isoCols = this.props.isoList.map((clr, idx) => {
				return (<div key={idx} style={{textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold', color: "white", backgroundColor: clr.isoColor , marginTop: ".8vh"}}>{`${clr.properties.contour} minute walk`}</div>)
					})
			return(
			<div >
				<Collapsible trigger="Walking Range" triggerStyle={{ fontWeight: 600}}>				
  
					{isoCols}

				</Collapsible>
		</div>
				)
			} else { return <div>  mmmm</div>}
		}
	}



















