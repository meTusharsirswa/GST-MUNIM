const express = require("express");
const ProductGroup = require("../../Models/Masters/Product_Group_model");

const createProductGroup = async (req, res) => {
  try {
    const GroupDetail = req.body;
    const newGroup = await ProductGroup.create(GroupDetail);
    return res.status(200).json({
      status: true,
      message: "Product Group Created Successfully",
      data: newGroup,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const GetProductGroup = async (req, res) => {
  try {
    const GroupData = await ProductGroup.find({});
    return res.status(200).json({
      status: true,
      message: "Product Group Data Fetched",
      data: GroupData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const UpdateProductGroup = async (req, res) => {
  try {
    const ProductGroupDetail = req.body;
    const updateGroup = await ProductGroup.findByIdAndUpdate(
      req.params.id,
      { $set: ProductGroupDetail },
      { new: true }
    );
    if (!updateGroup) {
      return res.status(404).json({
        status: false,
        message: "Product Group Not Found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Product Group Update Successfully ",
      data: updateGroup,
    });
  } catch (error) {
    res.status(204).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const DeleteManyGroupsData = async (req, res) => {
  try {
    const GroupIds = req.body.data.GroupIds;
    if (!GroupIds || !Array.isArray(GroupIds) || GroupIds.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Product Group Ids",
      });
    }
    const deleteGroupData = await ProductGroup.deleteMany({
      _id: { $in: GroupIds },
    });
    if (deleteGroupData.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "No Product Group Found to Delete",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Product Group(s) Deleted Successfully",
      data: deleteGroupData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const DeleteProductGroupData = async (req, res) => {
  try {
    const GroupId = req.params.id;
    if (!GroupId) {
      return res.status(404).json({
        status: false,
        message: "Product Group Not Found",
      });
    }

    const deleteGroupData = await ProductGroup.findByIdAndDelete(GroupId);
    if (!deleteGroupData) {
      return res.status(404).json({
        status: false,
        message: "No Matcing Group Found for delete !",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Product Group Deleted Successfully",
      data: deleteGroupData,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  createProductGroup,
  GetProductGroup,
  UpdateProductGroup,
  DeleteManyGroupsData,
  DeleteProductGroupData,
};
