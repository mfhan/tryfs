const vendors = require("../controllers/vendorController.js");

module.exports = app => {
  var router = require("express").Router();

  //  Create a new Vendor
  router.post("/", vendors.create);

  // Retrieve all Tutorials
  router.get("/", vendors.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", vendors.findOne);

  // Update a Vendor with id
  router.put("/:id", vendors.update);

  //Register a vendor
  // router.post('/register', vendors.register);

  // router.post('/verify', vendors.verify);
  //Register a vendor
  router.post("/login", vendors.login);

  // router.post('/logout', vendors.logout);

  // router.post('/forgot', vendors.forgot);

  // router.post('/reset', vendors.reset);

  // router.post('/change', vendors.change);

  // Delete a Tutorial with id
  //router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  //router.delete("/", tutorials.deleteAll);

  app.use('/api/vendors/', router);
};