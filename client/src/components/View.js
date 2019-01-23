import React, { Component, lazy, Suspense } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Layer, Popup } from "react-mapbox-gl";
import * as MapboxGL from 'mapbox-gl';
import './CompStyles.css';
import keys from '../config.js'
const mapboxStyle = require("../mbxdull/style.json")

const Map = ReactMapboxGl({
  					accessToken: keys.mbx					
			});

export default class View extends Component {
constructor(props) {
	super(props)
  this.state={
    puvis: 'hidden',

  }
  this.handleHover = this.handleHover.bind(this)
}

handleHover(b) {
 /*console.log(b)*/
  this.props.hover(b)
  
}
handleHoverOut() {
  this.props.hoverOut() 
}

render() {
  var points, idArray;
  if(this.props.isoList) {
  var isos = this.props.isoList.map((iso, idx) => {
return (
  <GeoJSONLayer
    id={iso.id}
    before="landcover_wood"
    denoise={.5}
    key={idx} 
    data={iso}   
    fillPaint={{   "fill-color": iso.properties.color, "fill-opacity": .2, "fill-outline-color": "white",}}        
    />

)
  })
}
  if(this.props.hoverHotel) {
    var dynColor = this.props.hoverHotel.properties.ratingCol
    var ppup = (
    <Popup
     style={{backgroundColor: dynColor}}
      coordinates={this.props.hoverHotel.geometry.coordinates}
      offset={{
        'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
      }}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{fontSize: "18pt", fontWeight: "bold", color: "white",backgroundColor: this.props.hoverHotel.properties.ratingCol,  padding: "24px", margin: "-26px", borderWidth: "1px", borderRadius: "6px"}}>{this.props.hoverHotel.properties.name}</div>
      </div>
    </Popup>
      )} else {ppup = null}


// ------------------ make hotel markers
  
  if(this.props.curHotel) {
    var ch = (

      <GeoJSONLayer
      data={this.props.curHotel}
      type='circle' 
      circlePaint={{
        'circle-color': 'yellow',
        'circle-radius': {stops: [[14, 20], [16, 8]]}
      }}
      />

      )
  }
  if(this.props.curRest) {
    console.log(this.props.curRest)
    var cr = (
      <GeoJSONLayer
      data={this.props.curRest}
      type='circle' 
      circlePaint={{
        'circle-color': 'coral',
        'circle-radius': {stops: [[14, 20], [16, 8]]}
      }}
      />
      )
  }
  if(this.props.dlydHotObs /*&& !this.props.resGeoObj*/) { 

  points = this.props.dlydHotObs.map(( pt, idx) => {

  return(
      <GeoJSONLayer      
        circleOnMouseEnter={() => this.handleHover(pt)}
        circleOnMouseLeave={() => this.handleHoverOut()}  
         id={pt.id}  
         before=""
        key={idx}
        data={pt}      
        type='circle'
        circlePaint={{
          'circle-color': [ 
          'match',
          ['get', 'rating'],
          ["1"], this.props.ratingColors[0],
          ["1.5"], this.props.ratingColors[1],
          ["2"], this.props.ratingColors[2],
          ["2.5"], this.props.ratingColors[3],
          ["3"], this.props.ratingColors[4],
          ["3.5"], this.props.ratingColors[5],
          ["4"], this.props.ratingColors[6],
          ["4.5"], this.props.ratingColors[7],
          ["5"], this.props.ratingColors[8],
          /* other */ 'cyan' 
          ],
        'circle-radius': {stops: [[14, pt.properties.cRad], [16, 8]]}
        }}
      />)
})
} else if(this.props.resGeoObj) { 
   points = this.props.resGeoObj.features.map(( pt, idx) => {
return(
    <GeoJSONLayer      
        circleOnMouseEnter={() => this.handleHover(pt)}
        circleOnMouseLeave={() => this.handleHoverOut()}
      
        key={idx}
        data={pt}      
        type='circle'
        circlePaint={{
          'circle-color': [ 
          'match',
          ['get', 'rating'],
          ["1"], this.props.ratingColors[0],
          ["1.5"], this.props.ratingColors[0],
          ["2"], this.props.ratingColors[2],
          ["2.5"], this.props.ratingColors[2],
          ["3"], this.props.ratingColors[4],
          ["3.5"], this.props.ratingColors[4],
          ["4"], this.props.ratingColors[6],
          ["4.5"], this.props.ratingColors[6],
          ["5"], this.props.ratingColors[8],
          /* other */ 'cyan' 
          ],
        'circle-radius': {stops: [[14, 10], [16, 8]]}
        }}
       

      />
)
})
} else { return  (<div>..............................</div>)}
// ---------------- make isochromes  

  if(!this.props.iso && this.props.hotelsGeoJSON) {
	return (
    <div>
    
<Map
	center= {[this.props.appState.location[0], this.props.appState.location[1]]}
	zoom= {[this.props.appState.zoom]}
  	style={mapboxStyle}
  	containerStyle={{
    height: this.props.appState.h,
    width: this.props.appState.w
  }}>
  <div>{points}</div>
  <div>{isos}</div>
  <div>{ppup}</div>
  <div>{ch}</div>
  <div>{cr}</div>

</Map>

</div>
)} else { return(
  <Map
   center= {[this.props.appState.location[0], this.props.appState.location[1]]}
   zoom= {[this.props.appState.zoom]}
    style={mapboxStyle}
    containerStyle={{
    height: this.props.appState.h,
    width: this.props.appState.w
  }}>



</Map>

)
  }
}
}








