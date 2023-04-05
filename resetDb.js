const db = require('./models/index.js');

//was:
// const { db } = require('./db.config.js');

//console.log("database is: " + db);

const resetDb = async () => {
  try {
    await db.sequelize.sync({ force: true });
  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit()
  }
}

resetDb();
