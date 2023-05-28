const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/web_recruitment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;
