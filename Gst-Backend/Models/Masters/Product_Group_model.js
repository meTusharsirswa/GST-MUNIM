const mongoose = require("mongoose");

const ProductGroupSchema = mongoose.Schema({
  title: String,
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product-Group", ProductGroupSchema);
