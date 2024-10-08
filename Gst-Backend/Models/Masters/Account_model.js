const mongoose = require("mongoose")

const AccountSchema = mongoose.Schema({
    company_type : String,
    GSTIN : String,
    company_name : String,
    contact_person : String,
    contact_number : Number,
    email : String,
    registration_type : String,
    PAN : String,
    billing_address : String,
    billing_landmark : String,
    country : String,
    state  :String,
    city : String,
    pincode : Number,
    distance_from_e_way_bill : Number,
    customer_balance_type: { type: String, enum: ["credit", "debit"], default: "credit" },
    amount : {type : Number , default: 0},
    //? Shipping address  ---------->
    ship_GSTIN : String,
    ship_name : String,
    ship_phone : Number,
    ship_address : String,
    ship_country : String,
    ship_state : String,
    ship_pincode : Number,
    ship_pincode : Number,
    ship_distance_for_e_way_bill : Number,
    license_number : String,
    fax_number : String,
    website  :String,
    due_days : String,
    note : String,


})
module.exports = mongoose.model("Accounts",AccountSchema)