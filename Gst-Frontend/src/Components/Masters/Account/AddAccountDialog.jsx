import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateNumericInput } from "../../../utils";
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
const AddAccountDialog = ({
  isOpen,
  onClose,
  selectedItem,
  onCloseEditDialog,
  editDialogOpen,
  fetchAccountData,
  showToast,
}) => {
  const [editMode, setEditMode] = useState(false);

  // My All Dialog TextField State
  const [companyType, setCompanyType] = useState("customer");
  const [GSTIN, setGSTIN] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [registerType, setRegisterType] = useState("");
  const [PAN, setPAN] = useState("");
  const [address, setAddress] = useState("");
  const [landMark, setLandMark] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [eWayBillDistance, setEWayBillDistance] = useState("");
  const [customer_balance_type, setCustomerBalanceType] = useState("credit"); // Default value is "credit"
  const [amount, setAmount] = useState(0);
  const [licenseNo, setLicenseNo] = useState("");
  const [fax_number, setFaxNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [due_days, setDueDays] = useState("");
  const [note, setNote] = useState("");
  const [_id, set_id] = useState("");

  // Shipping State
  const [ship_GSTIN, setShipGSTIN] = useState("");
  const [ship_name, setShipName] = useState("");
  const [ship_phone, setShipPhone] = useState("");
  const [ship_address, setShipAddress] = useState("");
  const [ship_country, setShipCountry] = useState("");
  const [ship_state, setShipState] = useState("");
  const [ship_pincode, setShipPincode] = useState("");
  const [ship_distance_for_e_way_bill, setShipDistanceForEwayBill] =
    useState("");

  const [numericInputErrorShown, setNumericInputErrorShown] = useState(false);
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState("a");
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
    setCompanyType("customer");
    setGSTIN("");
    setCompanyName("");
    setContactPerson("");
    setContactNumber("");
    setEmail("");
    setRegisterType("");
    setPAN("");
    setAddress("");
    setLandMark("");
    setCountry("India");
    setState("");
    setCity("");
    setPinCode("");
    setEWayBillDistance("");
    setAmount("0");
    setShipGSTIN("");
    setShipName("");
    setShipPhone("");
    setShipAddress("");
    setShipCountry("");
    setShipState("");
    setShipPincode("");
    setShipDistanceForEwayBill("");
    setCustomerBalanceType("credit");
    setLicenseNo("");
    setFaxNumber("");
    setWebsite("");
    setDueDays("");
    setNote("");
  };

  const handleClose = () => {
    if (editDialogOpen) {
      onCloseEditDialog();
    } else {
      onClose();
    }
    resetAllFormData();
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setIsSaving(true); // Show loading bar

    const formData = {
      company_type: companyType || "",
      GSTIN: GSTIN || "",
      company_name: companyName || "",
      contact_person: contactPerson || "",
      contact_number: contactNumber || "",
      email: email || "",
      registration_type: registerType || "",
      PAN: PAN || "",
      billing_address: address || "",
      billing_landmark: landMark || "",
      country: country || "",
      state: state || "",
      city: city || "",
      pincode: pinCode,
      distance_from_e_way_bill: eWayBillDistance || "",
      customer_balance_type: customer_balance_type,
      amount: amount || "",
      ship_GSTIN: ship_GSTIN || "",
      ship_name: ship_name || "",
      ship_phone: ship_phone || "",
      ship_address: ship_address || "",
      ship_country: ship_country || "",
      ship_state: ship_state || "",
      ship_pincode: ship_pincode || "",
      ship_distance_for_e_way_bill: ship_distance_for_e_way_bill || "",
      fax_number: fax_number || "",
      website: website || "",
      due_days: due_days || "",
      license_number: licenseNo || "",
      note: note || "",
    };

    if (!companyName.trim()) {
      toast.error("Please Enter a Company Name");
      setIsSaving(false);
      return;
    }

    if (!country.trim()) {
      showToast("Country is Required");
      setIsSaving(false);
      return;
    }

    if (!state.trim()) {
      showToast("State is Required");
      setIsSaving(false);
      return;
    }

    try {
      let response;
      if (editMode) {
        console.log("Updating customer with ID:", selectedItem._id);
        response = await axios.put(
          `/api/update-customer-vendor/${selectedItem._id}`,
          formData
        );
      } else {
        response = await axios.post("/api/create-customer-vendor", formData);
      }

      if (response.data.status || response.status === 200) {
        showToast(response.data.message, "success");
        fetchAccountData();
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

  const handleRegisterTypeChange = (e) => {
    setRegisterType(e.target.value);
  };
  const handleShippingAddress = () => {
    setShowShippingAddress(true);
  };
  useEffect(() => {
    console.log("Edit dialog open:", editDialogOpen);
    console.log("Selected item:", selectedItem);

    try {
      if (editDialogOpen && selectedItem) {
        console.log("Inside edit mode");
        setEditMode(true);
        set_id(selectedItem._id);
        setCompanyType(selectedItem.company_type);
        setGSTIN(selectedItem.GSTIN);
        setCompanyName(selectedItem.company_name);
        setContactPerson(selectedItem.contact_person);
        setContactNumber(selectedItem.contact_number);
        setEmail(selectedItem.email);
        setRegisterType(selectedItem.registration_type);
        setPAN(selectedItem.PAN);
        setAddress(selectedItem.billing_address);
        setLandMark(selectedItem.billing_landmark);
        setCountry(selectedItem.country);
        setState(selectedItem.state);
        setCity(selectedItem.city);
        setPinCode(selectedItem.pincode);
        setEWayBillDistance(selectedItem.distance_from_e_way_bill);
        setAmount(selectedItem.amount);
        setShipGSTIN(selectedItem.ship_GSTIN);
        setShipName(selectedItem.ship_name);
        setShipPhone(selectedItem.ship_phone);
        setShipAddress(selectedItem.ship_address);
        setShipCountry(selectedItem.ship_country);
        setShipState(selectedItem.ship_state);
        setShipPincode(selectedItem.ship_pincode);
        setShipDistanceForEwayBill(selectedItem.ship_distance_for_e_way_bill);
        setCustomerBalanceType(selectedItem.customer_balance_type);
        setLicenseNo(selectedItem.license_number);
        setFaxNumber(selectedItem.fax_number);
        setWebsite(selectedItem.website);
        setDueDays(selectedItem.due_days);
        setNote(selectedItem.note);
        // Set other state variables similarly
      } else {
        console.log("Not in edit mode");
        // Clear form fields when not in edit mode
        setEditMode(false);

        resetAllFormData();
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [editDialogOpen, selectedItem]);

  useEffect(() => {
    fetchAccountData();
  }, []);
  return (
    <>
      <div>
        <React.Fragment>
          <Dialog
            fullScreen
            open={isOpen || editDialogOpen}
            onClose={editDialogOpen ? onCloseEditDialog : onClose}
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
                  {editMode
                    ? "Edit Customer / Vendor"
                    : "Add Customer / Vendor"}
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={editDialogOpen ? onCloseEditDialog : onClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className="container" style={{ overflowX: "hidden" }}>
              <List className="row ">
                <ListItem className="col-12 col-md-12 col-xl-12">
                  <label
                    htmlFor="company_type "
                    className="col-md-3 col-sm-3 col-3 col-xl-3"
                  >
                    Company Type{" "}
                  </label>
                  <div className="row col-md-12 col-sm-12 col-12 col-xl-12">
                    <div className="col-md-3 col-sm-3 col-5 col-xl-3 ">
                      <Radio
                        {...controlProps("customer")}
                        color="success"
                        onChange={() => setCompanyType("customer")}
                        checked={companyType === "customer"}
                      />
                      Customer
                    </div>
                    <div className="col-md-3 col-sm-3 col-5 col-xl-3 ">
                      <Radio
                        {...controlProps("vendor")}
                        color="success"
                        onChange={() => setCompanyType("vendor")}
                        checked={companyType === "vendor"}
                      />
                      Vendor
                    </div>
                    <div className="col-md-4 col-sm-4 col-12 col-xl-4 ">
                      <Radio
                        {...controlProps("customer/vendor")}
                        color="success"
                        onChange={() => setCompanyType("customer/vendor")}
                        checked={companyType === "customer/vendor"}
                      />
                      Customer / Vendor
                    </div>
                  </div>
                </ListItem>

                <Divider />
                <ListItem
                  className="d-flex flex-column flex-md-row"
                  style={{ columnGap: "15px" }}
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="GSTIN"
                  >
                    GSTIN
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter GSTIN"
                    value={GSTIN}
                    onChange={(e) => setGSTIN(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    Company Name{" "}
                    <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    Contact Person
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter contact person"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    Contact No
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Contact No."
                    value={contactNumber}
                    onChange={(e) => {
                      if (!validateNumericInput(e.target.value)) {
                        if (!numericInputErrorShown) {
                          toast.error("Please Enter only Numeric Value", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            // transition: Bounce,
                          });
                          setNumericInputErrorShown(true);
                        }
                      } else {
                        setNumericInputErrorShown(false);
                        setContactNumber(e.target.value);
                      }
                    }}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="emailaddress@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    Registration Type
                  </label>
                  <TextField
                    size="small"
                    select
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    id="outlined-basic"
                    variant="outlined"
                    value={registerType}
                    onChange={handleRegisterTypeChange}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) =>
                        value || "Select Registration Type",
                    }}
                  >
                    {/* Add MenuItem components for each option in the dropdown */}
                    <MenuItem value="Unregistered">Unregistered</MenuItem>
                    <MenuItem value="Regular">Regular</MenuItem>
                    <MenuItem value="Regular-Embassy/UN Body">
                      Regular-Embassy/UN Body
                    </MenuItem>
                    <MenuItem value="Regular-SEZ">Regular-SEZ</MenuItem>
                    <MenuItem value="Composition">Composition</MenuItem>
                    {/* Add more MenuItem components as needed */}
                  </TextField>
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    PAN
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter PAN"
                    value={PAN}
                    onChange={(e) => setPAN(e.target.value)}
                  />
                </ListItem>
                <Divider />
                <span className="fw-bold my-4">Billing Address </span>
                <Divider />
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    Address
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    LandMark
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter landmark"
                    value={landMark}
                    onChange={(e) => setLandMark(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    Country{" "}
                    <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    State{" "}
                    <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    City
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Company_name"
                  >
                    Pin Code
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Pin code"
                    value={pinCode}
                    onChange={(e) => {
                      if (!validateNumericInput(e.target.value)) {
                        if (!numericInputErrorShown) {
                          toast.error("Please Enter only Numeric Value", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            // transition: Bounce,
                          });
                          setNumericInputErrorShown(true);
                        }
                      } else {
                        setNumericInputErrorShown(false);
                        setPinCode(e.target.value);
                      }
                    }}
                  />
                </ListItem>
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Distance for e-way bill (in km)"
                  >
                    Distance for e-way bill (in km)
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Distance for e-way bill (in km)"
                    value={eWayBillDistance}
                    onChange={(e) => setEWayBillDistance(e.target.value)}
                  />
                </ListItem>
                <Divider />
                <span className="fw-bold my-4">Opening Balance</span>
                <Divider />

                <ListItem>
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="company_type"
                  >
                    Customer Balance
                  </label>
                  <div className="col-md-2 col-sm-2 col-12 col-xl-2  ">
                    <Radio
                      {...controlProps("credit")}
                      label="Credit"
                      checked={customer_balance_type === "credit"}
                      onChange={() => setCustomerBalanceType("credit")}
                    />
                    Credit
                  </div>
                  <div className="col-md-2 col-sm-2 col-12 col-xl-2">
                    <Radio
                      {...controlProps("debit")}
                      label="Debit"
                      checked={customer_balance_type === "debit"}
                      onChange={() => setCustomerBalanceType("debit")}
                    />
                    Debit
                  </div>
                </ListItem>

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Enter Amount"
                  >
                    Amount
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => {
                      if (!validateNumericInput(e.target.value)) {
                        if (!numericInputErrorShown) {
                          toast.error("Please Enter only Numeric Value", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            // transition: Bounce,
                          });
                          setNumericInputErrorShown(true);
                        }
                      } else {
                        setNumericInputErrorShown(false);
                        setAmount(e.target.value);
                      }
                    }}
                  />
                </ListItem>

                {/* Create Shipping Address */}
                <Divider />
                <div className="d-flex justify-content-between py-4">
                  <span className="fw-bold">Shipping Address</span>
                  <button
                    onClick={handleShippingAddress}
                    className="add_shipping_button"
                  >
                    <AddIcon /> Add{" "}
                  </button>
                </div>

                {showShippingAddress && (
                  <List>
                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="Enter Amount"
                      >
                        Ship.GSTIN
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Shipping GSTIN"
                        value={ship_GSTIN}
                        onChange={(e) => setShipGSTIN(e.target.value)}
                      />
                    </ListItem>
                    <Divider />

                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="Enter Amount"
                      >
                        Ship.Name
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Shipping Name"
                        value={ship_name}
                        onChange={(e) => setShipName(e.target.value)}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="Enter Amount"
                      >
                        Ship. Phone
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Shipping Phone No."
                        value={ship_phone}
                        onChange={(e) => setShipPhone(e.target.value)}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="Enter Amount"
                      >
                        Ship.Address
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Shipping Address"
                        value={ship_address}
                        onChange={(e) => setShipAddress(e.target.value)}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="Company_name"
                      >
                        Ship. Country
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Shipping Country"
                        value={ship_country}
                        onChange={(e) => setShipCountry(e.target.value)}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="Enter Amount"
                      >
                        Ship.State
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Shipping State"
                        value={ship_state}
                        onChange={(e) => setShipState(e.target.value)}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="Enter Amount"
                      >
                        Ship.PinCode
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Shipping PinCode"
                        value={ship_pincode}
                        onChange={(e) => setShipPincode(e.target.value)}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem
                      style={{ columnGap: "15px" }}
                      className="d-flex flex-column flex-md-row"
                    >
                      <label
                        className="label col-md-4 col-sm-4 col-12 col-xl-3"
                        htmlFor="Enter Amount"
                      >
                        Ship. Distance for e-way bill (in km)
                      </label>
                      <input
                        className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                        placeholder="Enter Distance for e-way bill (in km)"
                        value={ship_distance_for_e_way_bill}
                        onChange={(e) =>
                          setShipDistanceForEwayBill(e.target.value)
                        }
                      />
                    </ListItem>
                  </List>
                )}

                <Divider />
                <span className="fw-bold">Custom Fields</span>
                <Divider />

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Enter Amount"
                  >
                    License No.
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter License No."
                    value={licenseNo}
                    onChange={(e) => setLicenseNo(e.target.value)}
                  />
                </ListItem>
                <Divider />

                <span className="fw-bold my-4">Additional Details </span>
                <Divider />
                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Enter Amount"
                  >
                    Fax No.
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter fax No."
                    value={fax_number}
                    onChange={(e) => setFaxNumber(e.target.value)}
                  />
                </ListItem>
                <Divider />

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Enter Amount"
                  >
                    Website
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="www.sitename.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </ListItem>
                <Divider />

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Due Days"
                  >
                    Due Days
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter due days"
                    value={due_days}
                    onChange={(e) => setDueDays(e.target.value)}
                  />
                </ListItem>
                <Divider />

                <ListItem
                  style={{ columnGap: "15px" }}
                  className="d-flex flex-column flex-md-row"
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="Enter Amount"
                  >
                    Note
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
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

export default AddAccountDialog;
