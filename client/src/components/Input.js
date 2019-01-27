import React, { Component } from 'react';
import { FormGroup, ControlLabel, Well } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import eucities from '../eucities.js';
import '../App.css'
/*eucities.sort((a,b) => (a.city > b.city) ? 1 : ((b.city > a.city) ? -1 : 0));*/

export default class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({ value: e.target.value }, () => {
            var ccty = []
            eucities.map((cty, idx) => {
                if (cty.city.toUpperCase().includes(this.state.value.toUpperCase())) {
                    ccty.push(cty)
                }
                /*return ccty*/
            })
            this.setState({ cmap: ccty })
        });
    }
    handleClick(ct, lo, la) {
        this.props.getMapAndIso(ct, lo, la)
        this.setState({ cmap: [] }, () => this.props.removeResGeo())
    }
    render() {
      var rvrsd = this.state.value.split("").reverse()
      var rvrsStr = rvrsd.join().toString("")
      console.log(rvrsStr)
        if (this.state.cmap && this.state.value) {
            var matches = this.state.cmap.map((lne, idx) => {
                return (<div key={idx} style={{flexDirection: 'column'}}><button style={{width: '18vw', color: 'black', fontSize: '1vw'}}onClick={() => this.handleClick([lne.city, lne.cntrycode],[lne.lng, lne.lat])}>{lne.city + ", " + lne.cntrycode} </button></div>)
            })
        }
        return (
      <Collapsible trigger="Search for a European city">
         <div className={'inputHeader'}>
           
        <div>
          
          <input
            style={{color: 'black', marginTop: '1.4vh'}}           
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
         </div>
         <div style={{maxHeight: '38vh', overflow: 'auto', listStyleType:"none", flexDirection: 'column', flexWrap: 'wrap'}}>{matches}</div>
 
      </div>
      </Collapsible>
        )
    }
}