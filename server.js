const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const seed = require('./seed.js')
//do we need vendorcontroller? 
//const vendorController = require('./controllers/vendorController');
//from sequelize tutorial: 
//const db = require("./db.config.js");

//set up port
const PORT = process.env.PORT || 3001;

console.log("This is server.js")

//define the initial variable
const app = express();

//db.sequelize.sync();


const db = require("./models/index.js");
// db.sequelize.sync();

//the lines below had "force: true"
// db.sequelize.sync({ force: true }).then(() => {
//   seed();
//   console.log("Drop and re-sync db.");
// });

db.sequelize.sync().then(() => {
  // seed();
  console.log("Synced db WITHOUT force:true.");
});

var corsOptions = {
  origin: "http://localhost:3001"
};

//set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

//we are taking this out bc not express anymore but pg
//app.use('/vendors', vendorController);

//catch-all:
app.use((e, req, res, next) => {
  if (e) {
    console.log(e.message);
    next(e);
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to TryFullStack!');
});

require("./routes/routes.js")(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));