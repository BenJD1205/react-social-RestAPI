"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var dotenv = require("dotenv");

var helmet = require("helmet");

var morgan = require("morgan");

var userRoute = require("./routes/users");

var authRoute = require("./routes/auth");

var postRoute = require("./routes/post");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("Database connected!");
})["catch"](function (err) {
  return console.log(err);
}); //midleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.get("/", function (req, res) {
  res.send("Welcome to homepage");
});
app.get("/users", function (req, res) {
  res.send("Welcome user page");
});
app.listen(5000, function () {
  console.log('Backend server is running');
});