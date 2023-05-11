import logo from './logo.svg';
import './App.css';
import ReactMapGL from 'react-map-gl';
import {
  Routes, Route, useNavigate
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser, registerUser, showVendors, createVendor, updateVendor } from './services/api-helper';
import './App.css';
import VendorList from './components/VendorList'
import Login from './components/Login'
//we don't need SinlgeVendor because it's already been imported in the component Vendorlist ("import SingleVendor from './SingleVendor';")
import VendorForm from './components/VendorForm'
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
  const [vendor, setVendor] = useState({});
  const [formData, setFormData] = useState({})
  const navigate = useNavigate();

  const handleLogin = async () => {
    // console.log('props login click', this.props)
    const userData = await loginUser(formData);
    console.log('userData from handleLogin: ', userData)
    localStorage.setItem("jwt", userData.token.token)
    setVendor(userData.user)
    navigate("/vendors/" + userData.user.dataValues.id)
  };

  const loginHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  //because we have the "await" obligation we need a getVendors function to compose a list of vendors from the asynchrnous "showVendors" 
  const getVendors = async () => {
    const vendors = await showVendors()
    console.log("getVendors: ", vendors)
    setVendorListData(vendors)
  }

  const postVendor = async () => {
    const createdVendor = await createVendor(vendor)
    console.log("new Vendor: ", createdVendor)
    getVendors()
  }

  //we are using a local version of the updateVendor function because we don't get to overwrite the updateVendor coming from the api-helper
  const updateVendorfromMap = async (updatedVendor) => {
    console.log("updatedVendor from Map: ", updatedVendor)
    const vendor = await updateVendor(updatedVendor, updatedVendor.id)
    console.log("UPDATED Vendor from server: ", vendor)
    //getVendors()
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({
      ...vendor,
      [name]: value,
    })
  }

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


        {/* <Route path="/" element={ <> <Login/>   <Map  vendors={vendorListData} />   <RegisterCtaButton/> </> } /> */}

        <Routes>

          <Route path="/" element={
            <Login handleLogin={handleLogin}
              handleChange={loginHandleChange}
              formData={formData} />
          } />

          <Route path="/vendors/:id" element={
            <VendorForm handleSubmit={updateVendorfromMap}
              handleChange={handleChange}
              form={vendor} />
          } />


        </Routes>

        <Map
          //vendors below is the prop that we are passing to the Map component; we are allowing Map to have a props.vendors that has info from the vendorListData
          newVendorSetter={setVendor}
          vendors={vendorListData}
          vendorSetter={setVendorListData}
          showUpdateVendor={updateVendorfromMap}
        />


        <VendorForm
          form={vendor}
          handleChange={handleChange}
          handleSubmit={postVendor}
        //we def don't need these two lines:
        // lat={this.state.mapLat}
        // long={this.state.mapLong}
        />

        <VendorList
          vendors={vendorListData}
        />
      </header>
    </div >
  );
}

export default App;
