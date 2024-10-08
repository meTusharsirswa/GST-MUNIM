import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { viewport } from "@popperjs/core";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { ListItem } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ShowProductDetail({
  openProductDetail,
  hideProductDetail,
  // AccountData,
  selectedProductItem,
  ViewProductDetail,
}) {
  const handleClose = () => {
    // setOpen(false);
    hideProductDetail();
  };

  const getFieldValue = (value) => {
    return value ? value : "NA";
  };
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={openProductDetail}
        onClose={hideProductDetail}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar style={{ background: "#2F4F4F" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedProductItem && selectedProductItem.product_name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {selectedProductItem && (
          <div
            className="d-flex "
            style={{ backgroundColor: "  	#f1e39b", height: "100vh" }}
          >
            <List style={{ flex: 0.7 }}>
              <ListItem className="show_data_listItem">
                Product Name :{" "}
                <b>{getFieldValue(selectedProductItem.product_name)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                {" "}
                Description :
                <b>{getFieldValue(selectedProductItem.description)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                HSN SAS Code:{" "}
                <b>{getFieldValue(selectedProductItem.HSN_SAS_code)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Unit Of Measurment :{" "}
                <b>{getFieldValue(selectedProductItem.unit_of_measurement)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Product Type:{" "}
                <b>{getFieldValue(selectedProductItem.product_type)}</b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                GST: <b>{getFieldValue(selectedProductItem.gst)}</b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Cess: <b>{getFieldValue(selectedProductItem.gst)}</b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Cess Amount:{" "}
                <b>{getFieldValue(selectedProductItem.cess_amount)}</b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Available Qty. :{" "}
                <b>{getFieldValue(selectedProductItem.available_qty)}</b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Sell Price:{" "}
                <b>{getFieldValue(selectedProductItem.sell_price)}</b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Sell Price (Incl. Tax):{" "}
                <b>
                  {getFieldValue(selectedProductItem.sell_price_include_tax)}
                </b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Purchase Price :{" "}
                <b>{getFieldValue(selectedProductItem.purchase_price)}</b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Purchase Price (Incl. Tax):{" "}
                <b>
                  {getFieldValue(
                    selectedProductItem.purchase_price_include_tax
                  )}
                </b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Low Stock Alert :{" "}
                <b>{getFieldValue(selectedProductItem.low_stock_alert)}</b>
              </ListItem>
              <Divider />

              <ListItem className="show_data_listItem">
                Product Group :{" "}
                <b>{getFieldValue(selectedProductItem.product_group.title)}</b>
              </ListItem>
              <Divider />
            </List>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}
export default ShowProductDetail;
