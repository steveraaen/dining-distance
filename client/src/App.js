import React, { Component, lazy, Suspense  } from 'react';

import axios from 'axios'
import './App.css';
import Map from './components/View.js';
import Input from './components/Input.js';
import HotelList from './components/HotelList.js';

import Details from './components/Details.js';
import RestaurantTable from './components/RestaurantTable.js';
import RestaurantStats from './components/RestaurantStats.js';
import DistanceKey from './components/DistanceKey.js';
import RatingKey from './components/RatingKey.js';
import keys from './config.js'

var w = window.innerWidth;
var h = window.innerHeight;

class App extends Component {
    constructor(props) {
    super(props)
    this.state={
      w: w,
      h: h,
      city: "Barcelona",
        location: [2.1834, 41.3833],
        zoom: 14,
/*      ratingColorsRGBA: ["rgba(253, 129, 83, .6)","rgba(253, 129, 83, .6)","rgba(249, 85, 222, .6)","rgba(95, 87, 246, .6)","rgba(95, 87, 246, .6)","rgba(89, 243, 234,.6)","rgba(89, 243, 234,.6","rgba(253, 83, 95)","rgba(253, 83, 95)"].reverse(),
/**/        ratingColors: ["#31D40C","#31D40C","#5F57F6","#5F57F6","#F955DE","#F955DE","#FD8153","#FD8153","#FD535F"].reverse(),
        showKey: true,
        dotMode: "hotel",
        circleRadius: 10
      }
    this.getMapAndIso = this.getMapAndIso.bind(this)
    this.getSelectedChain = this.getSelectedChain.bind(this)
    this.getIso = this.getIso.bind(this)
    this.zoom = this.zoom.bind(this)
    this.getRestaurants = this.getRestaurants.bind(this)
    this.hover = this.hover.bind(this)
    this.hoverOut = this.hoverOut.bind(this)
    this.expandCircle = this.expandCircle.bind(this)
    this.expandRestCircle = this.expandRestCircle.bind(this)
    this.removeResGeo = this.removeResGeo.bind(this)
    this.toRGBA = this.toRGBA.bind(this)

    }

    toRGBA() {
    var isoColors = ["#FAC80A","#e500b1","#269CF2"]
    var matches;
    var rgbIsos = []; 
    var rgbaColors = isoColors.map((color, idx) => {
        matches = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
        matches = [
        parseInt(matches[1], 16),
        parseInt(matches[2], 16),
        parseInt(matches[3], 16),
        .6]
        var rgi = `rgba(${matches})`
        rgbIsos.push(rgi)
        this.setState({rgbIsos: rgbIsos})
    })
    }

   componentWillMount() {
    this.toRGBA()
    var rgbArr = []
    for(let i = 0; i < this.state.ratingColors.length; i++){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.state.ratingColors[i]);
      var result = [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        .4]
        var rgba = `rgba(${result})`
        rgbArr.push(rgba)
        }
        console.log(rgbArr)
        this.setState({rgbArr: rgbArr})

        
}
  zoom() {
    this.setState({zoom: 16})
  }getMapAndIso(cty, loc) {
    console.log('getMapAndIso called')
    this.setState({
      city: cty,
      location: loc
    }, () => {
      this.getSelectedChain(cty)
    })
    }
  getRestaurants(lo, la) {
    console.log('getRestaurants called')
    console.log(lo, la)
    axios.get('api/details',{ params: {longitude: lo, latitude: la}})
        .then( (res) => {
          console.log(res)
      var restObs = []
      var resGeoObj= {
        type: 'FeatureCollection',
        features: restObs
      }
      const colors = this.state.rgbArr
      var ratingCol=[]
      for(let i=0; i < res.data.length; i++) {
      
          switch(res.data[i].rating) {
              case 1:  
                ratingCol[i] = colors[0]
                break;
              case 1.5:  
                ratingCol[i] = colors[0]
                break;
              case 2:  
                ratingCol[i] = colors[2]
                break;
                case 2.5:  
                ratingCol[i] = colors[2]
                break;
                case 3:  
                ratingCol[i] = colors[4]
                break;
                case 3.5:  
                ratingCol[i] = colors[4]
                break;
                case 4:  
                ratingCol[i] = colors[6]
                break;
                case 4.5:  
                ratingCol[i] = colors[6]
                break;
                case 5:  
                ratingCol[i] = colors[8]  
                break;              
                default:
                ratingCol[i] = "cyan"
            }
        restObs.push({
        type: "Feature",
        geometry: {type: "Point", coordinates: [res.data[i].coordinates.longitude, res.data[i].coordinates.latitude]},  
        properties: {
          ratingCol: ratingCol[i],
          display_phone: res.data[i].display_phone,
          distance: res.data[i].distance,
          image_url: res.data[i].image_url,
          location: res.data[i].location,
          name: res.data[i].name,
          phone: res.data[i].phone,
          price:res.data[i].price,
          rating:JSON.stringify(res.data[i].rating),
          review_count: res.data[i].review_count,
         /* type: res.data[i].categories[0].title,*/
          opacity: 1,
          borderColor: "white",
          color: 'white'
         }
        }
      )
      restObs.sort((a,b) =>  (b.properties.rating > a.properties.rating) ? 1 : ((a.properties.rating > b.properties.rating) ? -1 : 0));     

      }
      console.log(restObs)
      this.setState({
        resGeoObj: resGeoObj
      }, () => {
    if(this.state.resGeoObj) {
        var totRtng = 0;
        var totRvws = 0;
        var totCvtPx = 0;
        var arr = this.state.resGeoObj.features
          for(let i = 0; i < arr.length; i++) {
            totRtng = totRtng + parseFloat(arr[i].properties.rating)
            totRvws = totRvws + arr[i].properties.review_count
            switch(arr[i].properties.price) {
              case "€":
              case "£":
              case "₺":
              case "$":
              arr[i].properties.cvtPx = 1
              break;
              case "€€":
              case "££":
              case "₺₺":
              case "$$":
              arr[i].properties.cvtPx = 2
              break;
              case "€€€":
              case "£££":
              case "₺₺₺":
              case "$$$":
              arr[i].properties.cvtPx = 3
              break;
                            break;
              case "€€€€":
              case "££££":
              case "₺₺₺₺":
              case "$$$$":
              arr[i].properties.cvtPx = 4
              default:
              arr[i].properties.cvtPx = 0
            }
            totCvtPx = totCvtPx + arr[i].properties.cvtPx
            var maxReviews = Math.max.apply(Math, resGeoObj.features.map(function(o) { return o.properties.review_count; }))
             
          }
  var rtngScore = (totRtng/arr.length).toFixed(2)
  var rvwsScore = (totRvws/arr.length).toFixed(2)
  var pxScore = (totCvtPx/arr.length).toFixed(2)
  
      }
      this.setState({
        rtngScore: rtngScore,
        rvwsScore: rvwsScore,
        pxScore: pxScore,
        maxReviews: maxReviews

      })
      })          
          this.setState({details: res})
        })  
  }
  getIso(lo, la, nm) {
/*    'https://api.mapbox.com/isochrone/v1/mapbox/walking/Madrid,-3.70459,40.42038?contours_minutes=5,15,30&polygons=true&access_token=pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqcGxudTVwaDBnNGQ0OW1sZ2NhcjVyZm8ifQ.J6sCIBi_knv8qU39mHqprA'
*/    var urlb = 'https://api.mapbox.com/isochrone/v1/mapbox/walking/' + lo + ',' + la + '?contours_minutes=5,15,30&contours_colors=FAC80A,e500b1,269CF2&polygons=true&access_token=' + keys.mbx
      console.log(urlb)
      axios.get(urlb)
        .then( (resp) =>{ 
          console.log(resp)
        for(let i = 0; i < resp.data.features.length; i++) {
          resp.data.features[i].id = "iso" + i
            for(let j = 0; j < this.state.rgbIsos.length; j++) {
              resp.data.features[j].isoColor = this.state.rgbIsos[j]
          }
        }         
          this.setState({
            isoList: resp.data.features,
            location: [lo, la],
            curHotel: nm
          })
      })
        .catch(function (error) {
         console.log(error);
  });
}
  getSelectedChain(ct) {
    axios.get('api/hotels',{ params: {city: ct}
      })
    .then(val => {  

      var hotObs = []
      var geoObj= {
        type: 'FeatureCollection',
        features: hotObs
      }
      const colors = this.state.rgbArr
      var ratingCol=[]
      for(let i=0; i < val.data.length; i++) {      
          switch(val.data[i].rating) {
              case 1:  
                ratingCol[i] = colors[0]
                break;
              case 1.5:  
                ratingCol[i] = colors[0]
                break;
              case 2:  
                ratingCol[i] = colors[2]
                break;
                case 2.5:  
                ratingCol[i] = colors[2]
                break;
                case 3:  
                ratingCol[i] = colors[4]
                break;
                case 3.5:  
                ratingCol[i] = colors[4]
                break;
                case 4:  
                ratingCol[i] = colors[6]
                break;
                case 4.5:  
                ratingCol[i] = colors[6]
                break;
                case 5:  
                ratingCol[i] = colors[8]  
                break;              
                default:
                ratingCol[i] = "cyan"
            }
        hotObs.push({
        type: "Feature",
        /*id: "hot" + i,*/
        geometry: {type: "Point", coordinates: [val.data[i].coordinates.longitude, val.data[i].coordinates.latitude]},  
        properties: {
          ratingCol: ratingCol[i],
          display_phone: val.data[i].display_phone,
          image_url: val.data[i].image_url,
          location: val.data[i].location,
          name: val.data[i].name,
          phone: val.data[i].phone,
          price:val.data[i].price,
          rating:JSON.stringify(val.data[i].rating),
          review_count: val.data[i].review_count,
          cRad: 10,
          opacity: 1,
          borderColor: "white",
          color: 'white'
         }
        }
      )
      hotObs.sort((a,b) =>  (b.properties.rating > a.properties.rating) ? 1 : ((a.properties.rating > b.properties.rating) ? -1 : 0));    
      }
      this.setState({
        geoObj: geoObj,
        hotelsGeoJSON: hotObs,
        dlydHotObs: hotObs,
        hotels: val.data,
        zoom: 14
      }, () => {      
        if(this.state.hotels) {
        this.getIso(this.state.hotels[0].coordinates.longitude, this.state.hotels[0].coordinates.latitude)    
        }
      })
    })  
  }
hover(b) {
  this.setState({
    hoverHotel: b
  })  
}
hoverOut() {
  this.setState({
    hoverHotel: null
  })  
}
  componentDidMount() {
    this.getMapAndIso(this.state.city, this.state.location, function() {
      this.getSelectedChain(this.state.city)
    })
  }
  toggleKey() {
    this.setState({
      showKey: !this.state.showKey
    })
  }
expandCircle(nm) {
  this.setState({
    curHotel: nm
  })
}
expandRestCircle(rst) {
  this.setState({
    curRest: rst
  })
}
removeResGeo() {
  this.setState({resGeoObj: null})
}

  render() {
    return (
      <div >
      <Suspense fallback={<div>Hello</div>}>
        <Map  getRestaurants={this.getRestaurants} expandCircle={this.expandCircle} dlydHotObs={this.state.dlydHotObs} curHotel={this.state.curHotel} curRest={this.state.curRest} resGeoObj={this.state.resGeoObj} ratingColors={this.state.ratingColors} hover={this.hover} hoverOut={this.hoverOut} dtls={this.state.details} isoList={this.state.isoList} appState={this.state} hotels={this.state.hotels} hotelsGeoJSON={this.state.hotelsGeoJSON}isoMarkers={this.state.isoMarkers} hoverHotel={this.state.hoverHotel}  updateLocation={this.updateLocation} />
      </Suspense>
      <div className="input"> 
      <div className="aside">    
          <Input getMapAndIso={this.getMapAndIso} removeResGeo={this.removeResGeo}/>
        </div>
        <div className="aside">
          <HotelList getMapAndIso={this.getMapAndIso} getIso={this.getIso} expandCircle={this.expandCircle} curHotel={this.state.curHotel} ratingColors={this.state.ratingColors} hotelsGeoJSON={this.state.hotelsGeoJSON} activeColor={this.state.activeColor} hoverHotel={this.state.hoverHotel} zoom={this.zoom} city={this.state.city} chain={this.state.chain} hotels={this.state.hotels} getIso={this.getIso} getRestaurants={this.getRestaurants}/>
          </div> 
          <div className="aside">
          <DistanceKey isoList={this.state.isoList} />
          </div>
        <div className="aside">
          <RatingKey rgbArr={this.state.rgbArr} ratingColors={this.state.ratingColors} />
        
          </div>
        </div>
      
      <div className="bannerTop">
        <Details resGeoObj={this.state.resGeoObj} dtls={this.state.details} curHotel={this.state.curHotel}/>
      </div>
        <div className="asider">
          <RestaurantStats rgbArr={this.state.rgbArr} maxReviews={this.state.maxReviews} pxScore={this.state.pxScore} rtngScore={this.state.rtngScore} rvwsScore={this.state.rvwsScore} />
          <RestaurantTable rgbArr={this.state.rgbArr} expandRestCircle={this.expandRestCircle} dtls={this.state.details} resGeoObj={this.state.resGeoObj}/>
        </div>
      </div>

    );
  }
}
export default App;





