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

  const addMarkers = () => {
    if (map.current && map.current.loaded() && props.vendors.length > 0) {
      //console.log("loaded")
      //clear out markers 
      map.current.removeLayer('markers')
      // add markers to map
      props.vendors.map((vendor) => {
        // create a HTML element for each feature
        console.log("Start Mapping")
        const el = document.createElement('div');
        el.className = 'marker';
        // make a marker for each feature and add to the map
        //then create a popup for each marker
        const popup = new mapboxgl.Popup().setHTML(
          `<h3>${vendor.username}</h3><p>${vendor.website}</p>`
        );

        const marker = new mapboxgl.Marker({
          element: el,
          draggable: true
        })
          .setLngLat([vendor.long, vendor.lat])
          .setPopup(popup)
          .addTo(map.current);
        //console.log("vendor.long: ", vendor.long)
        console.log("Mapped")

        function onDragEnd() {
          const lngLat = marker.getLngLat();
          // coordinates.style.display = 'block';
          // coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
          console.log("lngLat", lngLat)
        }
        marker.on('dragend', onDragEnd);
      })
    }
    console.log("marker", document.getElementsByClassName("marker"))
  }


  useEffect(() => {
    map.current.on('load', function () {
      addMarkers()
    });

  });

  useEffect(() => {
    addMarkers()
  }, [props.vendors]);

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
