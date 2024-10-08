const express = require("express");
const Unit = require("../../Models/Masters/Unit_model");

const CreateUnit = async (req, res) => {
  try {
    const unitDetail = req.body;
    const newUnit = await Unit.create(unitDetail);
    return res.status(200).json({
      status: true,
      message: "Unit Created Successfully",
      data: newUnit,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getUnit = async (req, res) => {
  try {
    const unitData = await Unit.find({});
    return res.status(200).json({
      status: true,
      message: "Unit Data Fetched",
      data: unitData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// 
const UpdateUnit = async (req, res) => {
    console.log("Received request to update unit:", req.body); // Add this
  try {
    const UnitDetails = req.body;
    const updateUnit = await Unit.findByIdAndUpdate(
      req.params.id,
      { $set: UnitDetails },
      { new: true }
    );
    if (!updateUnit) {
      return res.status(404).json({
        status: false,
        message: "Unit Not Found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Unit Update Successfully",
      data: updateUnit,
    });
  } catch (error) {
    res.status(204).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const DeleteMultipalUnitData = async (req, res) => {
  try {
    const UnitIds = req.body.data.UnitIds;
    if (!UnitIds || !Array.isArray(UnitIds) || UnitIds.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid Unit Ids ",
      });
    }

    const deleteUnit = await Unit.deleteMany({
      _id: { $in: UnitIds },
    });
    if (deleteUnit.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "No Unit Found To Delete",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Unit(s) Deleted Successfully ",
      data: deleteUnit,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const DeleteUnitData = async (req, res) => {
  try {
    const UnitId = req.params.id;
    if (!UnitId) {
      return res.status(404).json({
        status: false,
        message: "Unit Not Found",
      });
    }

    const deleteUnitData = await Unit.findByIdAndDelete(UnitId);
    if (!deleteUnitData) {
      return res.status(404).json({
        status: false,
        message: "No Matching Unit Found For delete",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Unit Deleted Successfully !",
      data: deleteUnitData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  CreateUnit,
  getUnit,
  UpdateUnit,
  DeleteMultipalUnitData,
  DeleteUnitData,
};
