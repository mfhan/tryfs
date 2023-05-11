module.exports = (sequelize, Sequelize) => {
  const Vendor = sequelize.define("vendor", {
    username: Sequelize.STRING,
    password_digest: Sequelize.STRING,
    // zipcode: Sequelize.INTEGER,
    lat: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 40.753345,
      validate: { min: -90, max: 90 }
    },
    long: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: -73.982759,
      validate: { min: -180, max: 180 }
    },
    // snapshot: Sequelize.TEXT,
    // email: Sequelize.STRING,
    website: Sequelize.STRING
  });

  console.log(Vendor)

  return Vendor;

};

//taken from old Models.js file with old init method:
// class Vendor extends Sequelize.Model { }
// Vendor.init({
//   username: Sequelize.STRING,
//   zipcode: Sequelize.INTEGER,
//   lat: {
//     type: Sequelize.FLOAT,
//     allowNull: true,
//     defaultValue: 40.753345,
//     validate: { min: -90, max: 90 }
//   },
//   long: {
//     type: Sequelize.FLOAT,
//     allowNull: true,
//     defaultValue: -73.982759,
//     validate: { min: -180, max: 180 }
//   },
//   snapshot: Sequelize.TEXT,
//   email: Sequelize.STRING,
//   website: Sequelize.STRING
// }, {
//   sequelize: db,
//   modelName: 'vendor'
// });

// module.exports = {
//   Vendor
// }

