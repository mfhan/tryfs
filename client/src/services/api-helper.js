const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

export const loginUser = async (loginData) => {
  const resp = await axios.post(`${BASE_URL}/vendors/login`, loginData);
  return resp.data
}

// export const registerUser = async (formData) => {
//   const resp = await axios.post('/auth/register', formData);
//   localStorage.setItem('jwt', resp.data.token);
//   api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
//   return resp.data.user;
// };

// export const verifyUser = async (token) => {
//   api.defaults.headers.common.authorization = `Bearer ${token}`
//   const resp = await axios.post('/auth/verify');
//   return resp.data
// }

export const showVendors = async () => {
  try {
    const vendors = await axios.get(`${BASE_URL}/vendors`);
    console.log("showVendors: ", vendors)
    return vendors.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const createVendor = async (data) => {
  console.log("data from api-helper :", data)
  console.log("TOP OF createVendor")
  try {
    const vendor = await axios.post(`${BASE_URL}/vendors`, data);
    console.log("new vendor created")
    return vendor.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateVendor = async (data, id) => {
  console.log("data from api-helper :", data)
  console.log("id from api-helper :", id);
  try {
    const vendor = await axios.put(`${BASE_URL}/vendors/${id}`, data);
    return vendor.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const destroyVendor = async (id) => {
  try {
    const vendor = await axios.delete(`${BASE_URL}/vendors/${id}`);
    return vendor.data;
  } catch (e) {
    console.log(e.message);
  }
};
