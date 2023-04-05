const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

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
