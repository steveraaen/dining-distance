import React, { Component } from 'react';
import { FormGroup, ControlLabel, Well } from 'react-bootstrap';
import eucities from '../eucities.js';

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
    /*  componentDidMount() {
    let url = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json
      ?app_id=${keys.hereID}
      &app_code=${keys.hereCode}
      &query=${this.state.value}
      &beginHighlight=<b>
      &endHighlight=</b>`

      axios.get(url).then(resp => {
        this.setState({autoResp: resp})
      })
      }*/
    render() {
      var rvrsd = this.state.value.split("").reverse()
      var rvrsStr = rvrsd.join().toString("")
      console.log(rvrsStr)
        if (this.state.cmap) {
            var matches = this.state.cmap.map((lne, idx) => {
                return (<div key={idx} style={{flexDirection: 'column'}}><button style={{width: '18vw', color: 'black'}}onClick={() => this.handleClick([lne.city, lne.cntrycode],[lne.lng, lne.lat])}>{lne.city + ", " + lne.cntrycode} </button></div>)
            })
        }
        return (
            <Well style={{color: 'yellow', fontSize: "1.4vw", fontWeight: 'bold', backgroundColor: "rgba(0,0,0,.6)", borderWidth: '.1vw', borderRadius: '1vw'}}>
            Search for a European city
        <div style={{backgroundColor: "rgb(255,255,255)",color: 'yellow', display: 'flex',flexDirection: 'column', fontSize: "1.4vw"}}>
          
          <input
            style={{color: 'black'}}           
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
         </div>
         <div style={{maxHeight: '38vh', overflow: 'auto', listStyleType:"none", flexDirection: 'column', flexWrap: 'wrap'}}>{matches}</div>
 
      </Well>
        )
    }
}