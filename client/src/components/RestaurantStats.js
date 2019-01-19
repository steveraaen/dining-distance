import React, { Component } from 'react';
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
						<div style={{color: 'yellow', fontSize: "24pt", fontWeight: "bold", textAlign: 'center'}}>Restaurant Summary</div>
						<div style={{display: 'flex', flexDirection: "row", alignItems: 'flex-start'}}>
								<div style={{width: "14vw", fontSize: 24, fontWeight: 'bold', textAlign: 'left'}}>
									<div style={{color: 'yellow', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: "1vw"}}>Avg Price<div style={{fontSize: '12px' , marginLeft: "1vw"}}>(1-3)</div></div>
								</div>
								<div style={{width: 3.333 * this.props.pxScore + "vw", backgroundColor: 'coral', fontSize: 24, fontWeight: 'bold', color: 'black'}}>
									{parseFloat(this.props.pxScore)}
								</div>
						</div>
						
						<div style={{display: 'flex', flexDirection: "row"}}>
								<div style={{width: "14vw", fontSize: 24, fontWeight: 'bold', textAlign: 'left'}}>
									<div style={{color: 'yellow', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: "1vw"}}>Avg Rating<div style={{fontSize: '12px' , marginLeft: "1vw"}}>(1-5)</div></div>
								</div>
								<div style={{width:  2 * this.props.rtngScore +"vw", backgroundColor: 'cyan',  fontSize: 24, fontWeight: 'bold', color: 'black'}}>
									{parseFloat(this.props.rtngScore)}
								</div>
						</div>						

				</div>
            )
        } else { return null }
    }
}