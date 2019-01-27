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
				return (<div key={idx} style={{textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold', color: "white", backgroundColor: clr.isoColor , marginTop: ".8vh",marginBottom: ".33vh"}}>{`${clr.properties.contour} minute walk`}</div>)
					})
			return(
			<div style={{width: "18vw", backgroundColor: "rgba(0,0,0,.6)", textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold',color: "yellow", paddingTop: "1vw", paddingBottom: "1vw",borderWidth: ".6vw", borderRadius: ".6vw", marginBottom: '2vh'}}>
				<Collapsible trigger="Walking Range" triggerStyle={{width: "18vw",  textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold',color: "yellow", padding: "1vw", borderWidth: ".1vw", borderColor: "white", borderRadius: "1vw"}}>				
  
					{isoCols}

				</Collapsible>
		</div>
				)
			} else { return <div>  mmmm</div>}
		}
	}



















