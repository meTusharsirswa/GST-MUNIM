import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
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
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AddProductGroupDialog = ({
  isOpen,
  onClose,
  selectedItem,
  fetchProductGroupData,
  showToast,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = { title };
    if(!title.trim()){
      toast.error("Please Enter a Product Group Name");
      setIsSaving(false);
      return;
    }
    try {
      let response;
      if (selectedItem && selectedItem._id) {
        response = await axios.put(
          `/api/update-product-group/${selectedItem._id}`,
          formData
        );
      } else {
        response = await axios.post("/api/create-product-group", formData);
      }

      if (response.data.status || response.status === 200) {
        showToast(response.data.message, "success");
        fetchProductGroupData();
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
    if (selectedItem) {
      setTitle(selectedItem.title);
      setEditMode(true);
    } else {
      setTitle("");
      setEditMode(false);
    }
  }, [selectedItem]);

  return (
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
          right: 0,
        },
      }}
    >
      <AppBar
        sx={{ position: "relative" }}
        style={{ background: "white", color: "black" }}
      >
        <Toolbar className="toolbar">
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {editMode ? "Edit Product Group" : "Add Product Group"}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="container" style={{ overflowX: "hidden" }}>
        <List className="row">
          <ListItem
            className="d-flex flex-column flex-md-row"
            style={{ columnGap: "15px" }}
          >
            <label
              className="label col-md-4 col-sm-4 col-12 col-xl-3"
              htmlFor="name"
            >
              Name
              <sup style={{ color: "red", fontSize: "15px" }}>*</sup>
            </label>
            <input
              className="col-md-8 col-sm-8 col-12 col-xl-8 input-field"
              placeholder="Enter Your Product Group Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
  );
};

export default AddProductGroupDialog;
