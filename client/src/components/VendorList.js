import React from 'react';
import SingleVendor from './SingleVendor';

const VendorList = ({ vendors }) => {
  console.log("vendors from vendorlist: ", vendors)
  return (
    <>
      {vendors.map((vendor) => {
        return (
          <SingleVendor
            key={vendor.id}
            vendor={vendor}
          />
        )
      })}
    </>
  )
};
//for full CRUD functionaklity,. we will have to add: "showUpdateForm" and "handleDelete" alongaide "vendors" in the initial object destrcuturing on line 4
//
// showUpdateForm={showUpdateForm}
// handleDelete={handleDelete}

export default VendorList;
