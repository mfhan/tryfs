import React, { Component } from 'react';
import { useRef, useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import NewVendorForm from './NewVendorForm'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWVmciIsImEiOiJjbGZ1YnlxZngwOTNyM3BtZ2g2aDdtcmFuIn0.OxqqAK7gSgLGQKbFv5Kp7Q';


const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.9841719);
  const [lat, setLat] = useState(40.753345);
  const [zoom, setZoom] = useState(14);
  const [currentVendor, setCurrentVendor] = useState({});


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
      console.log("map.current.getLayer(markers): ", map.current.getLayer('markers'))
      if (map.current.getLayer('markers') !== undefined) {
        map.current.removeLayer('markers')
      }
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
        console.log("Mapped")

        function onDragEnd() {
          const lngLat = marker.getLngLat();
          console.log("the vendor data is ", vendor)
          console.log("lngLat", lngLat)
          //step 1:  change the vendor's lat long to the new one; 
          vendor.long = lngLat.lng
          vendor.lat = lngLat.lat
          // step2: save the new latlong to the currentvendor state 
          setCurrentVendor(vendor)
          //we attempted this to remove previous marker, but didn't work
          // props.vendorSetter(props.vendors)
          //now we need to attach useEffect to the currentVendor state to update the database, then log it to the console
          console.log("the vendor's NEW long is ", vendor.long)
          console.log("the vendor's NEW lat is ", vendor.lat)
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

  useEffect(() => {
    if (currentVendor.id) {
      console.log("currentVendor in the useEffect in progress", currentVendor)
      props.showUpdateVendor(currentVendor)
      console.log("props", props)
    }
  }, [currentVendor]);



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