import logo from './logo.svg';
import './App.css';
import ReactMapGL from 'react-map-gl';
// import {
//   Route, Switch, Redirect
// } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { showVendors, createVendor } from './services/api-helper';
import './App.css';
import VendorList from './components/VendorList'
//we don't need SinlgeVendor because it's already been imported in the component Vendorlist ("import SingleVendor from './SingleVendor';")
import NewVendorForm from './components/NewVendorForm'
import Map from './components/Map'
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import 'mapbox-gl/dist/mapbox-gl.css';
// mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWVmciIsImEiOiJjbGZ1YnlxZngwOTNyM3BtZ2g2aDdtcmFuIn0.OxqqAK7gSgLGQKbFv5Kp7Q';


function App() {

  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-73.9841719);
  // const [lat, setLat] = useState(40.753345);
  // const [zoom, setZoom] = useState(14);

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v12',
  //     center: [lng, lat],
  //     zoom: zoom
  //   });
  // });


  const [vendorListData, setVendorListData] = useState([]);
  const [newVendor, setNewVendor] = useState({});

  //because we have the "await" obligation we need a getVendors function to compose a list of vendors from the asynchrnous "showVendors" 
  const getVendors = async () => {
    const vendors = await showVendors()
    console.log("getVendors: ", vendors)
    setVendorListData(vendors)
  }

  const postVendor = async () => {
    const vendor = await createVendor(newVendor)
    console.log("new Vendor: ", vendor)
    getVendors()
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({
      ...newVendor,
      [name]: value,
    })
  }



  //old React syntax -- once the component has been loaded into the page, it fires once
  // componentDidMount() {
  //   console.log('Hey guys, componentDidMount!')
  //   this.getVendors()
  // }

  //by creating an empty array, we say we only want to run getVendors once 
  useEffect(() => { getVendors() }, []);

  //compared with foodcartcome, the "render" doesn't need to be explicitly defined; it will be rendered in the return area 

  return (
    <div className="App">
      <header className="App-header">

        {/* <div>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container" />
        </div> */}

        <Map
          vendors={vendorListData}
        />


        <NewVendorForm
          form={newVendor}
          handleChange={handleChange}
          handleSubmit={postVendor}
        // lat={this.state.mapLat}
        // long={this.state.mapLong}
        />

        <VendorList
          vendors={vendorListData}
        />
      </header>
    </div>
  );
}

export default App;
