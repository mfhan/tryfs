
module.exports = {
  HOST: "localhost",
  USER: "mfhan",
  PASSWORD: "123",
  DB: "tryfs_db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};