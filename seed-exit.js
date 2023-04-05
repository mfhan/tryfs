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
    process.exit();
    //Bthis is a file separate from "server.js" to run a standalone command to properly exit the process 
  }
};

//seed() fires the seed function 
seed();
//we don;t need module export as we don;t need t=o talk to server in this action
//module.exports = seed
