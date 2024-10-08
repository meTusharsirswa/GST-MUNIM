const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  item_type: String,
  product_name: String,
  description: String,
  HSN_SAS_code: String,
  unit_of_measurement: String,
  // stock: {
  //   type: Number,
  //   default: 0,
  // },
  product_type: String,
  gst: String,
  cess: Number,
  cess_amount: Number,
  available_qty: Number,
  sell_price: Number,
  sell_price_include_tax: Number,
  purchase_price: Number,
  purchase_price_include_tax: Number,
  low_stock_alert: Number,
  product_group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product-Group",
    default: null, // Set a default value to null to make it optional
    required: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
