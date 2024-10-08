const mongoose = require("mongoose");

const UnitSchema = mongoose.Schema({
  unit_name: String,
  short_name: String,
});

module.exports = mongoose.model("Unit", UnitSchema);
