const express = require("express");
const Account = require("../../Models/Masters/Account_model");

const CreateAccountData = async (req, res) => {
  try {
    const customerDetail = req.body;
    const newCustomer = await Account.create(customerDetail);
    return res.status(200).json({
      status: true,
      message: "Customer Created Successfully",
      data: newCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const GetAccountData = async (req, res) => {
  try {
    const getCustomerData = await Account.find({});
    return res.status(200).json({
      status: true,
      message: "Customer Data Fetched Successfully",
      data: getCustomerData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const UpdateAccountData = async (req, res) => {
  try {
    const CustomerDetail = req.body;
    const updateCustomer = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: CustomerDetail },
      { new: true }
    );
    if (!updateCustomer) {
      return res.status(404).json({
        status: false,
        message: "Customer Not Found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Customer Updated Successfully",
      data: updateCustomer,
    });
  } catch (error) {
    res.status(204).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const DeleteManyAccountData = async (req, res) => {
  try {
    const customerIds = req.body.data.customerIds; // Adjust to match the request structure

    if (
      !customerIds ||
      !Array.isArray(customerIds) ||
      customerIds.length === 0
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid Customer Ids",
      });
    }

    const deleteCustomerData = await Account.deleteMany({
      _id: { $in: customerIds },
    });

    if (deleteCustomerData.deletedCount === 0) {
      // Use `deletedCount` instead of `deleteCount`
      return res.status(404).json({
        status: false,
        message: "No customers found to delete",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Customer(s) Deleted Successfully",
      data: deleteCustomerData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const DeleteAccountData = async (req, res) => {
  try {
    const customerId = req.params.id; // Use req.params to get the id
    if (!customerId) {
      return res.status(404).json({
        status: false,
        message: "Customer Not Found",
      });
    }

    const deleteCustomerData = await Account.findByIdAndDelete(customerId);
    if (!deleteCustomerData) {
      return res.status(404).json({
        status: false,
        message: "No Matching customer found for delete !",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Customer Deleted Successfully",
      data: deleteCustomerData,
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
  CreateAccountData,
  GetAccountData,
  UpdateAccountData,
  DeleteManyAccountData,
  DeleteAccountData,
};
