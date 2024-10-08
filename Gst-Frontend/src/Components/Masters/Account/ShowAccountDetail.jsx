import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

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

function ShowAccountDetail({
  openAccountDetail,
  hideAccountDetail,
  selectedAccountData,
  ViewAccountDetail,
}) {
  const handleClose = () => {
    hideAccountDetail();
  };

  const getFieldValue = (value) => {
    return value ? value : "NA";
  };
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={openAccountDetail}
        onClose={hideAccountDetail}
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
              {selectedAccountData && selectedAccountData.company_name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {selectedAccountData && (
          <div
            className="d-flex"
            style={{ backgroundColor: "  	#f1e39b", height: "100vh" }}
          >
            <List style={{ flex: 1 }}>
              <ListItem className="show_data_listItem">
                Company type :{" "}
                <b>{getFieldValue(selectedAccountData.company_type)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                {" "}
                GSTIN :<b>{getFieldValue(selectedAccountData.GSTIN)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Company name:{" "}
                <b>{getFieldValue(selectedAccountData.company_name)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Contact Person :{" "}
                <b>
                  {getFieldValue(
                    getFieldValue(selectedAccountData).contact_person
                  )}
                </b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Contact Number :{" "}
                <b>{getFieldValue(selectedAccountData.contact_number)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Email : <b>{getFieldValue(selectedAccountData.email)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Registration Type :{" "}
                <b>{getFieldValue(selectedAccountData.registration_type)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                PAN Number : <b>{getFieldValue(selectedAccountData.PAN)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Billing Address :{" "}
                <b>
                  {getFieldValue(selectedAccountData.billing_address)}
                  {" , "}
                  {selectedAccountData.billing_landmark}
                </b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Country : <b>{getFieldValue(selectedAccountData.country)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                State : <b>{getFieldValue(selectedAccountData.state)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                City : <b>{getFieldValue(selectedAccountData.city)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Pin Code : <b>{getFieldValue(selectedAccountData.pincode)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Distance From E-Way Bill :{" "}
                <b>
                  {getFieldValue(selectedAccountData.distance_from_e_way_bill)}
                </b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Customer Balance Type :{" "}
                <b>
                  {getFieldValue(selectedAccountData.customer_balance_type)}
                </b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Balance : <b>{getFieldValue(selectedAccountData.amount)}</b>
              </ListItem>
              <Divider />
            </List>
            <div
              style={{
                height: "100%",
                width: "1px",
                backgroundColor: "grey",
              }}
            ></div>
            <List style={{ flex: 1 }}>
              <ListItem className="show_data_listItem">
                Ship GSTIN :{" "}
                <b>{getFieldValue(selectedAccountData.ship_GSTIN)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Ship Name :{" "}
                <b>{getFieldValue(selectedAccountData.ship_name)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Ship Phone :{" "}
                <b>{getFieldValue(selectedAccountData.ship_phone)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Ship Address :{" "}
                <b>{getFieldValue(selectedAccountData.ship_address)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Ship Country :{" "}
                <b>{getFieldValue(selectedAccountData.ship_country)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Ship State :{" "}
                <b>{getFieldValue(selectedAccountData.ship_state)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Ship Pin Code :{" "}
                <b>{getFieldValue(selectedAccountData.ship_pincode)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Ship Distance E-Way Bill :{" "}
                <b>
                  {getFieldValue(
                    selectedAccountData.ship_distance_for_e_way_bill
                  )}
                </b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                {" "}
                License Number :{" "}
                <b>{getFieldValue(selectedAccountData.license_number)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Fax Number :{" "}
                <b>{getFieldValue(selectedAccountData.fax_number)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Website : <b>{getFieldValue(selectedAccountData.website)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                Due Days : <b>{getFieldValue(selectedAccountData.due_days)}</b>
              </ListItem>
              <Divider />
              <ListItem className="show_data_listItem">
                {" "}
                Note : <b>{getFieldValue(selectedAccountData.note)}</b>
              </ListItem>
              <Divider />
            </List>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}
export default ShowAccountDetail;
