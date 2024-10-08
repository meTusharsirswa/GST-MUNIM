import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import SaveAsSharpIcon from "@mui/icons-material/SaveAsSharp";
import Slide from "@mui/material/Slide";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AddUnitDialog = ({
  isOpen,
  onClose,
  selectedUnitItems,
  fetchUnitData,
  showToast,
}) => {
  const [editMode, setEditMode] = useState(false);

  // My All Dialog TextField State

  const [unit_name, setUnit_name] = useState("");
  const [short_name, setShort_name] = useState("");
  const [_id, set_id] = useState("");

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

  //   const handleClose = () => {
  //     if (editProductGroupDialog) {
  //       EditDialogProductGroupClose();
  //     } else {
  //       onClose();
  //     }
  //     resetAllFormData();
  //   };

  const handleSave = async (e) => {
    console.log("Save button clicked");
    e.preventDefault();
    setIsSaving(true);
    const formData = { unit_name, short_name };
    if (!unit_name.trim()) {
      toast.error("Please Enter a Unit Name");
      setIsSaving(false);
      return;
    }
    if (!short_name.trim()) {
      toast.error("Please Enter a Short Name");
      setIsSaving(false);
      return;
    }
    try {
      let response;
      if (editMode) {
        console.log("Sending update request");
        response = await axios.put(
          `/api/update-unit/${selectedUnitItems._id}`,
          formData
        );
      } else {
        response = await axios.post("/api/create-unit", formData);
      }

      if (response.data.status || response.status === 200) {
        showToast(response.data.message, "success");
        fetchUnitData();
        onClose();
      } else {
        showToast(response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error.response || error);
      showToast(error.response?.data?.message || "Error saving product group");
    }
  };

  useEffect(() => {
    if (selectedUnitItems) {
      setEditMode(true);
      setUnit_name(selectedUnitItems.unit_name);
      setShort_name(selectedUnitItems.short_name);
      set_id(selectedUnitItems._id);
    } else {
      setEditMode(false);
      setUnit_name("");
      setShort_name("");
      set_id("");
    }
  }, [selectedUnitItems]);

  useEffect(() => {
    fetchUnitData();
  }, []);
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
                  {editMode ? "Edit Unit " : "Add Unit "}
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  //   onClick={
                  //     editProductGroupDialog
                  //       ? EditDialogProductGroupClose
                  //       : onClose
                  //   }
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
                    htmlFor="name"
                  >
                    Unit Name
                    <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Your Unit Name"
                    value={unit_name}
                    onChange={(e) => setUnit_name(e.target.value)}
                  />
                </ListItem>
                <ListItem
                  className="d-flex flex-column flex-md-row"
                  style={{ columnGap: "15px" }}
                >
                  <label
                    className="label col-md-4 col-sm-4 col-12 col-xl-3"
                    htmlFor="name"
                  >
                    Short Name
                    <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
                  </label>
                  <input
                    className="col-md-8 col-sm-8 col-12 col-xl-8 input-field "
                    placeholder="Enter Your Unit Name"
                    value={short_name}
                    onChange={(e) => setShort_name(e.target.value)}
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

export default AddUnitDialog;
