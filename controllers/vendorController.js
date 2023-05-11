const db = require("../models");
const Vendor = db.vendors;
//const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const { hashPassword, genToken, checkPassword, restrict } = require('../services/auth');

// vendorController.post('/', restrict, async (req, res) => {
//   try {
//     const vendor = await Vendor.create(req.body);
//     res.json(vendor);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

// router.post('/verify', vendors.verify);
// router.post('/login', vendors.login);
// router.post('/logout', vendors.logout);

//from PayPlay: 
// exports.register = (req, res) => {
//   //console.log("top of the register function")
//   {
//     const { username, email, password } = req.body;
//     const password_digest = await hashPassword(password);
//     const user = await Artist.create({ username, email, password_digest });
//     const token = buildAuthResponse(user);
//     res.json({ user, token });
//   } catch (e) {
//     next(e);
//   }
//   }

//MAYBE AI??? 
// Create a Vendor
// const vendor = {
//   username: req.body.username,
//   lat: req.body.lat,
//   long: req.body.long,
//   // snapshot: req.body.snapshot,
//   // email: req.body.email,
//   website: req.body.website
// };

// // Save Vendor in the database
// Vendor.create(vendor)
//   .then(data => {
//     res.send(data);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "error while creating a Vendor profile."
//     });
//   });

const buildAuthResponse = ((user) => {
  const { id, username } = user;
  const tokenData = { id, username };
  const token = genToken(tokenData);
  return { user: { id, username }, token };
});

const stripPassword = (user) => {
  const { password_digest, ...otherKeys } = user;
  return otherKeys;
}


exports.create = async (req, res) => {
  //console.log("top of the create function")
  console.log("req.body: ", req.body)
  if (!req.body.username) {
    res.status(400).send({
      message: "You need a username!"
    });
    return;
  }
  const password_digest = await hashPassword(req.body.password);
  // Create a Vendor
  const vendor = {
    username: req.body.username,
    lat: req.body.lat,
    long: req.body.long,
    // snapshot: req.body.snapshot,
    // email: req.body.email,
    website: req.body.website,
    password_digest: password_digest
  };



  // Save Vendor in the database ALONG WITH AUTH data
  Vendor.create(vendor)
    .then(data => {
      const token = buildAuthResponse(data);
      res.json({ data, token });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error while creating a Vendor profile."
      });
    });
};

exports.login = (req, res) => {
  console.log("top of the login function")
  const { username, password } = req.body;
  Vendor.findOne({ where: { username } })
    .then(user => {
      if (!user) {
        res.status(401).send({
          message: "Incorrect username or password."
        });
        return;
      }
      const isPasswordValid = checkPassword(password, user.password_digest);
      if (!isPasswordValid) {
        res.status(401).send({
          message: "Incorrect username or password."
        });
        return;
      }
      const token = buildAuthResponse(user);
      res.json({ user: stripPassword(user), token });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error while logging in."
      });
    });
}

exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Sequelize.Op.iLike]: `%${username}%` } } : null;
  console.log("Hello from findAll in controller: ")
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

exports.update = (req, res) => {
  console.log("Hello from update in controller ")
  const id = req.params.id;
  console.log("type of id: ", typeof id)
  //console.log("id in vendorcontroller: ", id)
  Vendor.update(
    req.body,
    // originally: { where: id })
    // then: { where: {id : id} })
    { returning: true, where: { id: parseInt(id) } })
    .then(data => {
      console.log("data after 'then' in vendorcontroller: ", data)
      console.log(data[1][0].dataValues)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving updated vendor info."
      });
    });

}



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


