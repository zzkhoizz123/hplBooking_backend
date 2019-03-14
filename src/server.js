const express =  require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("express-jwt");
const gracefulShutdown = require("http-graceful-shutdown");

const server_config = require("./config/server");

const api = require("./api/api");

const app = express();

app.use(cors());

app.use("/**", (req, res, next) => {
  console.log("[" + req.method + "] " + req.originalUrl);
  // logger.info(JSON.stringify(req.body));
  next();
});

app.use(
    jwt({ secret: server_config.TOKEN_SECRET }).unless({
      path: ["/api/v1/users/signin", "/api/v1/users/signup", "/api/v1/users/"]
    })
  );
app.use(bodyParser.json());

app.use("/api/", api);

// error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // jwt auth error
    res.status(401);
    res.json({
      message: "Invalid Token",
      success: false,
      error: 0,
      data: {}
    });
    res.end();
  } else if (err instanceof RequestError) {
    // request error
    res.status(err.status);
    res.json({
      message: err.message,
      success: false,
      error: err.code,
      data: {}
    });
    res.end();
  } else {
    // other error
    console.log(err);
    res.status(500);
    res.json({
      message: err,
      success: false,
      error: -1,
      data: {}
    });
    res.end();
  }
});

const server = () =>
  new Promise((resolve, reject) => {
    console.log("Starting Server");
    const s = app.listen(server_config.PORT, err => {
      if (err) {
        reject(err);
      } else {
        gracefulShutdown(s);
        resolve(s);
      }
    });
  });

module.exports = server;
