const Product_Group_model = require("../../Models/Masters/Product_Group_model");
const Product = require("../../Models/Masters/Product_model");

const CreateProduct = async (req, res) => {
  try {
    const productDetail = req.body;
    if (productDetail.product_group) {
      const groupExist = await Product_Group_model.findById(
        productDetail.product_group
      );
      if (!groupExist) {
        return res.status(404).json({
          status: false,
          message: "Invalid Product Group ID",
        });
      }
    }
    const newProduct = await Product.create(productDetail);
    return res.status(200).json({
      status: true,
      message: "Product Created Successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const GetProductData = async (req, res) => {
  try {
    const getProduct = await Product.find().populate('product_group')


    return res.status(200).json({
      status: true,
      message: "Product Data Fetched Successfully",
      data: getProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const UpdateProductData = async (req, res) => {
  try {
    const productDetail = req.body;
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productDetail },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({
        status: false,
        message: "Product Not Found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Product Updated Successfully",
      data: updateProduct,
    });
  } catch (error) {
    res.status(204).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const DeleteManyProductData = async (req, res) => {
  try {
    const productIds = req.body.data.productIds;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid productIds provided",
      });
    }

    const deleteProductData = await Product.deleteMany({
      _id: { $in: productIds },
    });
    if (deleteProductData.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "No products found to delete",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Product(s) Deleted Successfully",
      data: deleteProductData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const DeleteProductData = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: false,
        message: " product Not Found",
      });
    }
    const deleteProductsData = await Product.findByIdAndDelete(productId);
    if (!deleteProductsData) {
      return res.status(404).json({
        status: false,
        message: "Product Not Found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Product Deleted Successfully",
      data: deleteProductsData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  CreateProduct,
  GetProductData,
  UpdateProductData,
  DeleteManyProductData,
  DeleteProductData,
};
