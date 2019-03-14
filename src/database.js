const mongoose =  require("mongoose");

const database_config = require("./config/database");

// silly way to export the database
const database = () =>
  new Promise((resolve, reject) => {
    console.log("Connecting MongoDB");
    const db = mongoose.connect(
      database_config.MONGODB_URI,
      { useNewUrlParser: true },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      }
    );
  });

module.exports = database;