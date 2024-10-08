import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  formatIndianCurrency,
  formateDate,
  validateNumericInput,
} from "../../../utils";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { Checkbox, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveAsSharpIcon from "@mui/icons-material/SaveAsSharp";
import Slide from "@mui/material/Slide";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const AddProductDialog = ({
  isOpen,
  onClose,
  selectedProductItem,
  onCloseEditDialog,
  editProductDialog,
  fetchProductData,
  showToast,
  UnitData,
  ProductGroupData,
  fetchProductGroupData,
}) => {
  const [editMode, setEditMode] = useState(false);

  // My All Dialog TextField State

  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [HSN_SAS_code, setHSN_SAS_code] = useState("");
  const [unit_of_Measurement, setUnit_Of_Measurement] = useState("");
  // const [stock, setStock] = useState(0);
  const [product_type, setProduct_type] = useState("");
  const [Gst, setGst] = useState("Select GST");
  const [Cess, setCess] = useState("");
  const [CessAmount, setCessAmount] = useState("");
  const [available_qty, setAvailable_qty] = useState("");
  const [Sell_Price, setSell_Price] = useState("");
  const [Sell_PriceIncludeTax, setSell_PriceIncludeTax] = useState("");
  const [purchase_price, setPurchase_price] = useState("");
  const [purchase_priceIncludeTax, setPurchase_priceIncludeTax] = useState("");
  const [low_stock_alert, setLow_stock_alert] = useState("");
  const [title, setTitle] = useState("");
  const [product_group, setProduct_group] = useState("");

  const [_id, set_id] = useState("");
  const [showAddProductGroupField, setShowAddProductGroupField] =
    useState(false);
  //   const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSaving, setIsSaving] = useState(false); // State variable for loading bar

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const resetAllFormData = () => {
    set_id("");
    setProductName("");
    setDescription("");
    setHSN_SAS_code("");
    setUnit_Of_Measurement("");
    // setStock(0);
    setGst("");
    setCess("");
    setCessAmount("");
    setAvailable_qty("");
    setPurchase_price("");
    setPurchase_priceIncludeTax("");
    setLow_stock_alert("");
    setSell_Price("");
    setSell_PriceIncludeTax("");
    setProduct_group("");
  };

  const handleClose = () => {
    if (editProductDialog) {
      onCloseEditDialog();
    } else {
      onClose();
    }
    resetAllFormData();
  };

  useEffect(() => {
    if (selectedProductItem) {
      setEditMode(true);
      // Populate form fields with selectedProductItem data
    } else {
      setEditMode(false);
      resetAllFormData();
    }
  }, [selectedProductItem]);
  const handleSave = async (event) => {
    event.preventDefault();
    setIsSaving(true); 

    const formData = {
      product_name: product_name || "",
      description: description || "",
      HSN_SAS_code: HSN_SAS_code || "",
      unit_of_measurement: unit_of_Measurement || "",
      product_type: product_type || "",
      // stock: stock || 0,
      gst: Gst || "",
      cess: Cess,
      cess_amount: CessAmount,
      available_qty: available_qty,
      sell_price: Sell_Price,
      sell_price_include_tax: Sell_PriceIncludeTax,
      purchase_price: purchase_price,
      purchase_price_include_tax: purchase_priceIncludeTax,
      low_stock_alert: low_stock_alert,
      product_group: product_group,
    };

    if (!product_name.trim()) {
      toast.error("Please Enter a Product Name");
      setIsSaving(false);
      return;
    }
    if (!unit_of_Measurement.trim()) {
      toast.error("Please Enter a Unit of Measurement");
      setIsSaving(false);
      return;
    }
    if (!product_group.trim()) {
      toast.error("Please Enter a Product Group");
      setIsSaving(false);
      return;
    }
    try {
      let response;
      if (editMode) {
        console.log("Updating product with ID:", selectedProductItem._id);
        response = await axios.put(
          `/api/update-product/${selectedProductItem._id}`,
          formData
        );
      } else {
        response = await axios.post("/api/create-product", formData);
      }

      if (response.data.status || response.status === 200) {
        showToast(response.data.message, "success");
        fetchProductData();
        handleClose();
      } else {
        showToast(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error.response || error);
      showToast(error.response?.data?.message || "Error saving customer");
    } finally {
      setIsSaving(false);
    }
  };

  const handleProductType = (e) => {
    setProduct_type(e.target.value);
  };
  //   const handleShippingAddress = () => {
  //     setShowShippingAddress(true);
  //   };
  useEffect(() => {
    console.log("Edit dialog open:", editProductDialog);
    console.log("Selected item:", selectedProductItem);

    try {
      if (selectedProductItem) {
        console.log("Inside edit mode");
        setEditMode(true);
        set_id(selectedProductItem._id);
        setProductName(selectedProductItem.product_name);
        setDescription(selectedProductItem.description);
        setHSN_SAS_code(selectedProductItem.HSN_SAS_code);
        setUnit_Of_Measurement(selectedProductItem.unit_of_measurement);
        setProduct_type(selectedProductItem.product_type);

        // setStock(selectedProductItem.stock);
        setGst(selectedProductItem.gst);
        setCess(selectedProductItem.cess);
        setCessAmount(selectedProductItem.cess_amount);
        setAvailable_qty(selectedProductItem.available_qty);
        setSell_Price(selectedProductItem.sell_price);
        setSell_PriceIncludeTax(selectedProductItem.sell_price_include_tax);
        setPurchase_price(selectedProductItem.purchase_price);
        setPurchase_priceIncludeTax(
          selectedProductItem.purchase_price_include_tax
        );
        setLow_stock_alert(selectedProductItem.low_stock_alert);
        setProduct_group(selectedProductItem.product_group);

        // Set other state variables similarly
      } else {
        console.log("Not in edit mode");
        // Clear form fields when not in edit mode
        setEditMode(false);
        // // Clear state variables
        // set_id("");
        // setCompanyType("customer");
        // setGSTIN("");
        // setCompanyName("");
        // Clear other state variables similarly
        resetAllFormData();
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [editProductDialog, selectedProductItem]);

  useEffect(() => {
    fetchProductData();
    console.log("UnitData", UnitData);
  }, []);

  const AddProductGroupField = () => {
    // setShowAddProductGroupField(!false);
    setShowAddProductGroupField((previous) => !previous);
  };

  const createProductGroup = async () => {
    const formData = { title };
    try {
      let response = await axios.post("/api/create-product-group", formData);

      if (response.data.status || response.status === 200) {
        showToast(response.data.message, "success");
        fetchProductGroupData();
        setShowAddProductGroupField(false);
      } else {
        showToast(response.data.message);
      }
    } catch (error) {
      showToast(error);
    }
  };

  return (
    <>
      <div>
        <React.Fragment>
          <Dialog
            fullScreen
            open={isOpen}
            onClose={onClose}
            TransitionComponent={Transition}
            maxWidth="md"
            fullWidth={false}
            PaperProps={{
              style: {
                width: 700,
                position: "fixed",
                right: 0, // Stick to the right side
              },
            }}
          >
            <AppBar
              sx={{ position: "relative" }}
              style={{ background: "white", color: "black" }}
            >
              <Toolbar className="toolbar">
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                  className="col-12 col-md-6 col-xl-4 col-lg-8"
                >
                  {editMode ? "Edit Product " : "Add Product "}
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={editProductDialog ? onCloseEditDialog : onClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className="container" style={{ overflowX: "hidden" }}>
              <List className="row ">
                <ListItem
                  className="d-flex flex-column flex-md-row"
                  style={{ columnGap: "15px" }}
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="product_name"
                  >
                    Product Name
                    <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Product Name"
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="description"
                  >
                    Product Description{" "}
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </ListItem>

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="HSN_SAS_code"
                  >
                    HSN / SAS Code
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter HSN Code"
                    value={HSN_SAS_code}
                    onChange={(e) => setHSN_SAS_code(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Unit Of Measurement"
                  >
                    Unit Of Measurement
                    <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
                  </label>

                  {/* <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Unit Of Measurement"
                    value={unit_of_Measurement}
                    onChange={(e) => setUnit_Of_Measurement(e.target.value)}
                  /> */}
                  <TextField
                    size="small"
                    select
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    id="outlined-basic"
                    variant="outlined"
                    value={unit_of_Measurement}
                    onChange={(e) => setUnit_Of_Measurement(e.target.value)}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) => value || "Select Unit",
                    }}
                  >
                    {UnitData.map((item) => (
                      <MenuItem key={item._id} value={item.short_name}>
                        {item.short_name}
                      </MenuItem>
                    ))}
                    {/* {UnitData.map((item) => (
                      <MenuItem key={item._id} value={item.short_name}>
                        {item.short_name}
                      </MenuItem> */}
                    {/* ))} */}
                  </TextField>
                </ListItem>
                <Divider />
                <span className="fw-bold my-4">Tax & Pricing </span>
                <Divider />
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="product_type"
                  >
                    Product Type
                  </label>
                  <TextField
                    size="small"
                    select
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    id="outlined-basic"
                    variant="outlined"
                    value={product_type}
                    onChange={handleProductType}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) => value || "Select Product Type",
                    }}
                  >
                    {/* Add MenuItem components for each option in the dropdown */}
                    <MenuItem value="Taxable">Taxable</MenuItem>
                    <MenuItem value="Nil Rated">Nil Rated</MenuItem>
                    <MenuItem value="Exempt">Exempt</MenuItem>
                    <MenuItem value="Non-GST">Non-GST</MenuItem>
                    {/* Add more MenuItem components as needed */}
                  </TextField>
                </ListItem>

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="GST"
                  >
                    GST %
                  </label>
                  <TextField
                    size="small"
                    select
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    id="outlined-basic"
                    variant="outlined"
                    value={Gst}
                    onChange={(e) => setGst(e.target.value)}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) => value || "Select GST %",
                    }}
                  >
                    {/* Add MenuItem components for each option in the dropdown */}
                    <MenuItem value="Select GST">Select GST</MenuItem>
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="0.1">0.1</MenuItem>
                    <MenuItem value="0.25">0.25</MenuItem>
                    <MenuItem value="0.5">0.5</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="1.5">1.5</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7.5">7.5</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="18">18</MenuItem>
                    <MenuItem value="28">28</MenuItem>
                  </TextField>
                </ListItem>

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="cess"
                  >
                    Cess %
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Cess"
                    value={Cess}
                    onChange={(e) => setCess(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="cess_amount"
                  >
                    Cess Amount
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Cess Amount"
                    value={CessAmount}
                    onChange={(e) => setCessAmount(e.target.value)}
                  />
                </ListItem>

                <Divider />
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="available_qty"
                  >
                    Available Qty.{" "}
                    {/* <sup style={{ color: "red", fontSize: "15px" }}>*</sup> */}
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Available Qty."
                    value={available_qty}
                    onChange={(e) => setAvailable_qty(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="sell_price"
                  >
                    Sell Price{" "}
                    {/* <sup style={{ color: "red", fontSize: "15px" }}>*</sup> */}
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Sell Price"
                    value={Sell_Price}
                    onChange={(e) => setSell_Price(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="sell_price_tax"
                  >
                    Sell Price Include Tax{" "}
                    {/* <sup style={{ color: "red", fontSize: "15px" }}>*</sup> */}
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Sell Price Include Tax"
                    value={Sell_PriceIncludeTax}
                    onChange={(e) => setSell_PriceIncludeTax(e.target.value)}
                  />
                </ListItem>

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="purchase_price"
                  >
                    Purchase Price
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Purchase Price"
                    value={purchase_price}
                    onChange={(e) => setPurchase_price(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="purchase_price"
                  >
                    Purchase Price (Incl.Tax)
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Purchase Price (Incl.Tax)"
                    value={purchase_priceIncludeTax}
                    onChange={(e) =>
                      setPurchase_priceIncludeTax(e.target.value)
                    }
                  />
                </ListItem>

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="low_stock_alert"
                  >
                    Low Stock Alert
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Low Stock Alert"
                    value={low_stock_alert}
                    onChange={(e) => setLow_stock_alert(e.target.value)}
                  />
                </ListItem>

                <Divider />
                <div className="d-flex justify-content-lg-between align-items-center">
                  <span className="fw-bold my-4">Product Group </span>
                  <button
                    onClick={AddProductGroupField}
                    className="add_product_group_button"
                  >
                    {" "}
                    <AddIcon /> Add Product Group
                  </button>
                </div>
                {showAddProductGroupField && (
                  <>
                    <Divider />
                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row mb-2"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="title"
                      >
                        Add Product Group
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Product Group "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </ListItem>
                    <div>
                      <div></div>
                      <button
                        style={{ width: "20%", float: "right" }}
                        className="customer_vendor_dialog_buttons"
                        onClick={createProductGroup}
                      >
                        Save
                      </button>
                    </div>
                  </>
                )}
                <Divider />
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row mt-4"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="product_type"
                  >
                    Product Group
                    <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
                  </label>
                  <TextField
                    size="small"
                    select
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    id="outlined-basic"
                    variant="outlined"
                    value={product_group}
                    onChange={(e) => setProduct_group(e.target.value)}
                    // SelectProps={{
                    //   displayEmpty: true,
                    //   renderValue: (value)=> value || "Select Product"
                    // }}
                  >
                    {ProductGroupData.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </ListItem>
              </List>
              <Divider />
              <div className="dialog_button">
                <button
                  className="customer_vendor_dialog_buttons"
                  style={{ background: "#6c86a1" }}
                  onClick={onClose}
                >
                  Close
                </button>

                <button
                  className="customer_vendor_dialog_buttons"
                  onClick={handleSave}
                >
                  <SaveAsSharpIcon fontSize="small" /> Save
                </button>
              </div>
            </div>
          </Dialog>
        </React.Fragment>
      </div>
    </>
  );
};

export default AddProductDialog;
