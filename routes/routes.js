module.exports = app => {
  const vendors = require("../controllers/vendorController.js");

  var router = require("express").Router();

  //  Create a new Tutorial
  router.post("/", vendors.create);

  // Retrieve all Tutorials
  router.get("/", vendors.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", vendors.findOne);

  // Update a Tutorial with id
  //router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  //router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  //router.delete("/", tutorials.deleteAll);

  app.use('/api/vendors/', router);
};