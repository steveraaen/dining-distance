import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './CompStyles.css';

export default class RestaurantStats extends Component {
    constructor(props) {
        super(props)

    }
/*      shouldComponentUpdate(nextProps, nextState) { 
    if (nextProps.maxReviews === this.props.maxReviews) { 
      return false;
    }
    return true;
  }*/
    render() {
        if (this.props.pxScore && this.props.rtngScore && this.props.rvwsScore) {
            return (
				
                <div className="statBox">
						<Collapsible trigger = "Restaurant Summary" triggerStyle={{color: 'coral', fontSize: '1.8vw', textAlign: 'center'}}>
						<div style={{display: 'flex', flexDirection: "row", alignItems: 'flex-start'}}>
								<div style={{width: "14vw", fontSize: "1.6vh", fontWeight: "medium", textAlign: 'left'}}>
									<div style={{color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: "1vw", fontSize: '1.2vw'}}>Avg Price<div style={{fontSize: '1.2vw' , marginLeft: "1vw"}}>(1-3)</div></div>
								</div>
								<div style={{width: 3.333 * this.props.pxScore + "vw", backgroundColor: 'red', fontSize: "1.3vw", color: 'black'}}>
									{parseFloat(this.props.pxScore)}
								</div>
						</div>
						
						<div style={{display: 'flex', flexDirection: "row", alignItems: 'flex-start'}}>
								<div style={{width: "14vw", fontSize: "1.6vh", fontWeight: "medium", textAlign: 'left'}}>
									<div style={{color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: "1vw", fontSize: '1.2vw'}}>Avg Rating<div style={{fontSize: '1.2vw' , marginLeft: "1vw"}}>(1-5)</div></div>
								</div>
								<div style={{width:  2 * this.props.rtngScore +"vw", backgroundColor: 'lightGreen',  fontSize: "1.3vw", fontWeight: 'bold', color: 'black'}}>
									{parseFloat(this.props.rtngScore)}
								</div>
						</div>						
						</Collapsible>
				</div>
				
            )
        } else { return null }
    }
}