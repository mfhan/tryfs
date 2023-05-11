import React, { useRef, useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import NewVendorForm from './NewVendorForm';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWVmciIsImEiOiJjbGZ1YnlxZngwOTNyM3BtZ2g2aDdtcmFuIn0.OxqqAK7gSgLGQKbFv5Kp7Q';

const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef({})
  const [viewport, setViewport] = useState({
    latitude: 40.753345,
    longitude: -73.9841719,
    zoom: 14
  });
  const [currentVendor, setCurrentVendor] = useState({});

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom
    });

    map.current.on('load', function () {
      console.log("addMarkers from load")
      addMarkers();
    });
  }, []);

  //this useEffect fires every time props.vendors changes
  useEffect(() => {
    console.log("addMarkers from useEffect")
    addMarkers();
  }, [props.vendors]);

  const addMarkers = () => {
    console.log("map.current.loaded: ", map.current.loaded())
    console.log("props.vendors.length: ", props.vendors.length)

    if (map.current && map.current.loaded() && props.vendors.length > 0) {
      console.log("props.vendors: ", props.vendors)

      props.vendors.forEach((vendor) => {
        //markersRef was created to check existence of marker ("is there already a marker? if so, no need to do it again"), associating vendor.id with a marker object 
        let marker = markersRef.current[vendor.id];
        console.log("marker from markersRef: ", marker)

        if (!marker) {
          const el = document.createElement('div');
          el.className = 'marker';

          const popup = new mapboxgl.Popup().setHTML(
            `<h3>${vendor.username}</h3><p>${vendor.website}</p>`
          );

          marker = new mapboxgl.Marker({
            element: el,
            draggable: true
          })
            .setLngLat([vendor.long, vendor.lat])
            .setPopup(popup)
            .addTo(map.current);


          markersRef.current[vendor.id] = marker;
        } else {
          marker.setLngLat([vendor.long, vendor.lat]);
        }

        var cc = map.getContainer();
        var els = cc.getElementsByClassName('marker');
        console.log("els: ", els)

        function onDragEnd() {
          const lngLat = marker.getLngLat();

          const updatedVendor = {
            ...vendor,
            long: lngLat.lng,
            lat: lngLat.lat
          };

          props.vendorSetter((prevVendors) => {
            // Remove the old vendor from the vendors array
            const vendors = prevVendors.filter((v) => v.id !== updatedVendor.id);
            // Add the updated vendor to the vendors array
            vendors.push(updatedVendor);
            return vendors;
          });

          setCurrentVendor(updatedVendor);
        }

        marker.on('dragend', onDragEnd);
      });
    }
  };



  useEffect(() => {
    if (currentVendor.id) {
      console.log("currentVendor: ", currentVendor)
      props.showUpdateVendor(currentVendor);
    }
  }, [currentVendor]);  //dependency array -- will fire every time the state of the vendor changes 

  return (
    <div>
      <h2>Our Map</h2>
      <div>
        <div className="sidebar">
          Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom: {viewport.zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
};

export default Map;
