const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ahmadsuqq:padilRhmn210904!@recruitment.xrjbt.mongodb.net/sample_airbnb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

module.exports = db;
