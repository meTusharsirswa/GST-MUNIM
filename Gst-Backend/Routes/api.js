const express = require("express");
const router = express.Router();
const path = require("path");

const Account = require("../Controller/Masters/Account_controller");
router.post("/create-customer-vendor", Account.CreateAccountData);
router.get("/get-customer-vendor", Account.GetAccountData);
router.put("/update-customer-vendor/:id", Account.UpdateAccountData);
router.post("/delete-multipal-customer", Account.DeleteManyAccountData);
router.delete("/delete-customer/:id", Account.DeleteAccountData);

// Product Routes
const Product = require("../Controller/Masters/Product_controller");
router.post("/create-product", Product.CreateProduct);
router.get("/get-product", Product.GetProductData);
router.put("/update-product/:id", Product.UpdateProductData);
router.post("/delete-multipal-product", Product.DeleteManyProductData);
router.delete("/delete-product/:id", Product.DeleteProductData);

// Product Group Routes
const ProductGroup = require("../Controller/Masters/Product_Group_controller");
router.post("/create-product-group", ProductGroup.createProductGroup);
router.get("/get-product-group", ProductGroup.GetProductGroup);
router.put("/update-product-group/:id", ProductGroup.UpdateProductGroup);
router.post(
  "/delete-multipal-product-group",
  ProductGroup.DeleteManyGroupsData
);
router.delete("/delete-product-group/:id", ProductGroup.DeleteProductGroupData);

// Units Routes
const Unit = require("../Controller/Masters/Unit_controller");
router.post("/create-unit", Unit.CreateUnit);
router.get("/get-unit", Unit.getUnit);
router.put("/update-unit/:id", Unit.UpdateUnit);
router.post("/delete-multipal-unit", Unit.DeleteMultipalUnitData);
router.delete("/delete-unit/:id", Unit.DeleteUnitData);

module.exports = router;
