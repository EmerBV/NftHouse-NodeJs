"use strict";

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Database connection error", err);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log(`Connected to ${mongoose.connection.name} database`);
});

mongoose.connect("mongodb://localhost/nfthouse");

// opcional
module.exports = mongoose.connection;
