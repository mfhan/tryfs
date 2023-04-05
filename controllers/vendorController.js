const db = require("../models");
const Vendor = db.vendors;
//const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");

// vendorController.post('/', restrict, async (req, res) => {
//   try {
//     const vendor = await Vendor.create(req.body);
//     res.json(vendor);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

exports.create = (req, res) => {
  //console.log("top of the create function")
  console.log("req.body: ", req.body)
  if (!req.body.username) {
    res.status(400).send({
      message: "You need a username!"
    });
    return;
  }
  // Create a Vendor
  const vendor = {
    username: req.body.username,
    lat: req.body.lat,
    long: req.body.long,
    // snapshot: req.body.snapshot,
    // email: req.body.email,
    website: req.body.website
  };


  // Save Vendor in the database
  Vendor.create(vendor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error while creating a Vendor profile."
      });
    });
};


exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Sequelize.Op.iLike]: `%${username}%` } } : null;

  Vendor.findAll({ where: condition })
    .then(data => {
      //console.log("data from controller: ", data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendor names."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Vendor.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Vendor with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Vendor with id=" + id
      });
    });
};





// const express = require('express');
// const { Vendor } = require('../models');
// // const { restrict } = require('../services/auth.js')
// const vendorController = express.Router();

// vendorController.get('/', async (req, res) => {
//   try {
//     const vendors = await Vendor.findAll();
//     console.log("All the carts!!!")
//     res.json(vendors);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });


