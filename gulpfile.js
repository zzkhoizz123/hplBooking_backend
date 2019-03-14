/* eslint-disable */

const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const abspath = require("gulp-absolute-path");

process.env.TS_NODE_PROJECT = "./tsconfig.json";
process.env.TS_CONFIG_PATHS = true;

gulp.task("start", done => {
  return nodemon({
    script: "index.js",
    watch: ["src/**/*.js"],
    ext: "js",
    exec: "js-node -r jsconfig-paths/register",
    env: {
      LOG_FILE: "./log/app.log",
      NODE_ENV: "DEV",
    },
    done: done
  });
});

gulp.task("prod", done => {
  return nodemon({
    script: "index.ts",
    watch: ["src/**/*.ts"],
    ext: "ts",
    exec: "ts-node -r tsconfig-paths/register",
    env: {
      // setup for production build
      // load file?
      NODE_ENV: "PROD",
      PORT: 8080,
      TOKEN_SECRET: "",
      MONGODB_HOST: "",
      MONGODB_PORT: "",
      MONGODB_DATABASE: "",
      MONGODB_USERNAME: "",
      MONGODB_PASSWORD: "",
      MONGODB_OPTION: "",
      MONGODB_URI: "",
      LOG_FILE: ""
    },
    done: done
  });
});

