const Vendor = require('./models/index.js');
//console.log(Vendor);

const vendorData = require('./vendorData');

const seed = async () => {
  try {
    const vendors = await Vendor.vendors.bulkCreate(vendorData);
    console.log(`${vendors.length} vendors have been created!`);
  } catch (e) {
    console.log(e.message);
  } finally {
    // process.exit(); 
    //with the above commented out, this file doesn't tell the terminal to stop runing javascrpt ("process.exit") 
    //BUT we need a separate file to riun a standalone command to properly exit the process 
  }
};

//seed();

module.exports = seed
