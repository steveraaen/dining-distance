import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

export default class DistanceKey extends Component {

	handleClick() {
		this.props.toggleKey()
	}
	render() {
		
		if(this.props.showKey) {
			return(
			<div style={{width: "18vw", backgroundColor: "rgba(0,0,0,.6)", textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold',color: "yellow", paddingTop: "1vw", paddingBottom: "1vw",borderWidth: ".6vw", borderRadius: ".6vw", marginBottom: '2vh'}}>

				<Collapsible trigger="Walking Range" triggerStyle={{width: "18vw",  textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold',color: "yellow", padding: "1vw", borderWidth: ".1vw", borderColor: "white", borderRadius: "1vw"}}>				
					<div style={{textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold', color: "black",  marginTop: ".8vh", backgroundColor: "white", opacity: .6,marginBottom: ".33vh"}}>5 minutes</div>
					<div style={{textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold', color: "black", backgroundColor: "white", opacity: .48 ,marginBottom: ".33vh"}}>10 minutes</div>
					<div style={{textAlign: 'center', fontSize: '1.4vw', fontWeight: 'bold', color: "black", backgroundColor: "white", opacity: .3 ,marginBottom: ".33vh"}}>15 minutes</div>
				</Collapsible>
		</div>
				)
		} else {
			return null
		}
	}
}

























