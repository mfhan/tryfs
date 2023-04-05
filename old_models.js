const Sequelize = require('sequelize');

const db = new Sequelize({
  database: 'tryfs_db',
  dialect: 'postgresql',
  define: { underscored: true }
});

class Vendor extends Sequelize.Model { }
Vendor.init({
  username: Sequelize.STRING,
  zipcode: Sequelize.INTEGER,
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
  snapshot: Sequelize.TEXT,
  email: Sequelize.STRING,
  website: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'vendor'
});

module.exports = {
  Vendor
}

//previous, we also exported the db
// module.exports = {
//   Vendor, db
// }
