import React, { Component } from 'react';
import { useRef, useState, useEffect } from 'react';
// import {
//   Route, Switch, Redirect
// } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
// import Map from 'react-map-gl';
import NewVendorForm from './NewVendorForm'
//from old app: import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
//import * as vendorData from '../data.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWVmciIsImEiOiJjbGZ1YnlxZngwOTNyM3BtZ2g2aDdtcmFuIn0.OxqqAK7gSgLGQKbFv5Kp7Q';


const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.9841719);
  const [lat, setLat] = useState(40.753345);
  const [zoom, setZoom] = useState(14);


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  }, []);

  useEffect(() => {
    map.current.on('load', function () {
      if (props.vendors.length > 0) {
        //console.log("loaded")
        // add markers to map
        props.vendors.map((vendor) => {
          // create a HTML element for each feature
          console.log("Start Mapping")
          const el = document.createElement('div');
          el.className = 'marker';
          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el).setLngLat([vendor.long, vendor.lat]).addTo(map.current);
          //console.log("vendor.long: ", vendor.long)
          console.log("Mapped")
        })
      }
    });

  });

  useEffect(() => {
    //console.log("props.vendors from loaded: ", props.vendors)
    //console.log("map: ", map)
    if (map.current && map.current.loaded() && props.vendors.length > 0) {
      //console.log("loaded")
      // add markers to map
      props.vendors.map((vendor) => {
        // create a HTML element for each feature
        console.log("Start Mapping")
        const el = document.createElement('div');
        el.className = 'marker';
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat([vendor.long, vendor.lat]).addTo(map);
        //console.log("vendor.long: ", vendor.long)
        console.log("Mapped")
      })
    }
    console.log("marker", document.getElementsByClassName("marker"))

  }, [props.vendors]);
  // eslint-disable-line react-hooks/exhaustive-deps




  // map.on('click', function (e) {
  // document.getElementById('info').innerHTML =
  // // e.point is the x, y coordinates of the mousemove event relative
  // // to the top-left corner of the map
  // JSON.stringify(e.point) + '<br />' +
  // // e.lngLat is the longitude, latitude geographical position of the event
  // JSON.stringify(e.lngLat.wrap());
  // });

  //<Link to={{
  //   pathname: '/tylermcginnis',
  //   state: {
  //     fromNotifications: true
  //   }
  // }}>Tyler McGinnis</Link>

  //render() {

  // {...this.state.viewport}
  //onViewportChange={(viewport) => this.setState({viewport})}

  // console.log(this.props)
  //   let redirect = this.props.clicked && <Redirect to={{
  //     pathname: "/nvf",
  //     state: {
  //       lat: this.state.mapLat,
  //       long: this.state.mapLng
  //     }
  // }}  />

  return (
    <div >
      <h2>Our Map</h2>
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
  //}
}

export default Map;
