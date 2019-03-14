const server = require("./src/server");
const database = require("./src/database");

let serverInstance;
let databaseInstance;

database()
  .catch(err => {
    //console.log(err);
    console.log("Cannot connect to MongoDB");
    // logger.error(err); // this returns undefined
    process.exit(1);
  })
  .then(db => {
    databaseInstance = db;
    console.log("MongoDB Connected...");
    return Promise.resolve();
  })
  // .then(async () => {
  //   console.log("Preparing database before start server");
  //   if (process.env.NODE_ENV !== "DEV") {
  //     console.log("NODE_ENV != DEV --- SKIP");
  //     return Promise.resolve();
  //   }
  //   await UserModel.deleteMany({});
  //   await WorkModel.deleteMany({});
  //   await UserModel.insertMany(sampleUsers);
  //   await WorkModel.insertMany(sampleWorks);
  //   return Promise.resolve();
  // })
  .then(() => server())
  .catch(err => {
    console.log("Cannot start server");
    console.log(err);
    process.exit(1);
  })
  .then(s => {
    serverInstance = s;
    console.log("Server started, on port:", serverInstance.address().port);
  });

// handling CTRL+C
const onShutdown = () => {
  console.log("Received SIGINT, closing SERVER and disconnect DATABASE");
  return new Promise(resolve => {
    serverInstance.close(() => resolve());
  })
    .then(() => {
      console.log("SERVER closed");
      databaseInstance.disconnect();
    })
    .then(() => {
      console.log("DATABASE disconnected");
      console.log("LOGGER shutdowned");
    })
    .then(() => {
      process.exit(0);
    });
};

process.on("SIGINT", onShutdown);
process.on("SIGTERM", onShutdown);
