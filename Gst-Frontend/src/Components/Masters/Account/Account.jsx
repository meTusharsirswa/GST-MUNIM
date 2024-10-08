import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../Styles/Masters.css";
import { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { formatIndianCurrency } from "../../../utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Checkbox, IconButton, LinearProgress, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DeleteOutlineOutlined,
  EditNoteOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import SearchAccount from "./SearchAccount";

const Account = ({
  filteredData,
  setFilterData,
  handleEditDialogOpen,
  openDialog,
  AccountData,
  fetchAccountData,
  showToast,
  ViewAccountDetail,
  updateFilteredData,
}) => {
  const [totalBalance, setTotalBalance] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [filterAccountData, setFilterAccountData] = useState("General");
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchBox, setSearchBox] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleSelectAll = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    const filteredData = getFilterAccountData(filterAccountData);
    const updatedSelectedRows = updatedSelectAll ? filteredData : [];
    setSelectedRows(updatedSelectedRows);
    setShowDeleteIcon(updatedSelectedRows.length > 0);
  };

  const GetTotalBalance = (row) => {
    setTotalBalance((prevSelectedRows) => [...prevSelectedRows, row]);
    setShowDeleteIcon(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLoading(true);

    const filterType =
      newValue === 0 ? "General" : newValue === 1 ? "customer" : "vendor";
    setFilterAccountData(filterType);

    const filteredResults = getFilterAccountData(filterType, filteredData);
    setFilterData(filteredResults);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  };

  const getFilterAccountData = (filterType, data = AccountData) => {
    if (filterType === "General") {
      return data;
    } else if (filterType === "customer") {
      return data.filter((row) => row.company_type === "customer");
    } else if (filterType === "vendor") {
      return data.filter((row) => row.company_type === "vendor");
    }
    return data;
  };

  const handleCheckboxChange = (row) => {
    const updatedSelectedRows = selectedRows.includes(row)
      ? selectedRows.filter((selectedRow) => selectedRow !== row)
      : [...selectedRows, row];

    setSelectedRows(updatedSelectedRows);
    setShowDeleteIcon(updatedSelectedRows.length > 0);
  };

  const handleDeleteSelected = () => {
    const customerIds = selectedRows.map((row) => row._id);
    if (!customerIds || customerIds.length === 0) {
      showToast("Invalid or empty customerIds");
      return;
    }

    axios
      .post("/api/delete-multipal-customer", {
        data: { customerIds },
      })
      .then((res) => {
        if (res.data.status) {
          showToast(res.data.message, "success");
          setSelectedRows([]);
          setShowDeleteIcon(false);
          fetchAccountData();
        } else {
          showToast(res.data.message);
        }
      })
      .catch((error) => {
        showToast(error.message);
      });
  };

  const handleDeleteSingle = (customerId) => {
    if (!customerId) {
      showToast("Invalid customer ID");
      return;
    }

    axios
      .delete(`/api/delete-customer/${customerId}`)
      .then((res) => {
        if (res.data.status) {
          showToast(res.data.message, "success");
          fetchAccountData();
        } else {
          showToast(res.data.message);
        }
      })
      .catch((error) => {
        showToast(error.message);
      });
  };

  const handleSearchBox = () => {
    setSearchBox((prevSearchBox) => !prevSearchBox);
    console.log("Search box state:", !searchBox);
  };

  useEffect(() => {
    const filteredResults = getFilterAccountData(filterAccountData);
    setFilterData(filteredResults);
  }, [AccountData, filterAccountData]);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Account</h1>
          <div className="d-flex column-gap-4">
            <button onClick={handleSearchBox} className="search_btn">
              <SearchOutlinedIcon />
              Search
            </button>
            <button onClick={() => openDialog()} className="add_account">
              <b>
                <AddIcon /> Add Account
              </b>
            </button>
          </div>
        </div>
        <div className={`search-box ${searchBox ? "show" : ""}`}>
          {searchBox && (
            <SearchAccount
              AccountData={AccountData}
              updateFilteredData={updateFilteredData}
              searchBox={searchBox}
              setSearchBox={setSearchBox}
              filterAccountData={filterAccountData}
            />
          )}
        </div>
      </div>
      <TableContainer component={Paper}>
        {loading && <LinearProgress />}
        <div className="d-flex pt-3 Account_table_heading ">
          <Box sx={{ width: "100%" }}>
            <Tabs
              onChange={handleChange}
              value={value}
              aria-label="Tabs where selection follows focus"
              selectionFollowsFocus
            >
              <Tab label="General" />
              <Tab label="Customer" />
              <Tab label="Vendor" />
            </Tabs>
          </Box>
        </div>
        <hr />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "5%" }}>
                {AccountData.length > 0 ? (
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                ) : (
                  " "
                )}
              </TableCell>
              <TableCell>
                <b>
                  <i>Account</i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>GSTIN </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Mobile No </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>City </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>State </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Outstanding Amount </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Action </i>
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row)}
                      onChange={() => handleCheckboxChange(row)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.company_name}
                  </TableCell>
                  <TableCell align="right">{row.GSTIN || "NA"}</TableCell>
                  <TableCell align="right">
                    {row.contact_number || "NA"}
                  </TableCell>
                  <TableCell align="right">{row.city || "NA"}</TableCell>
                  <TableCell align="right">{row.state || "NA"}</TableCell>
                  <TableCell align="right">
                    {totalBalance.includes(row) && (
                      <div>
                        {row.customer_balance_type === "credit" ? (
                          <span style={{ color: "red" }}>
                            {row.amount !== 0 ? (
                              <>
                                {formatIndianCurrency(row.amount) || "0"} You
                                Pay <ArrowUpwardIcon fontSize="small" />
                              </>
                            ) : (
                              "-"
                            )}
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {formatIndianCurrency(row.amount) || "0"} You
                            Collect
                            <ArrowDownwardIcon fontSize="small" />{" "}
                          </span>
                        )}
                      </div>
                    )}
                    {!totalBalance.includes(row) && (
                      <button
                        onClick={() => GetTotalBalance(row)}
                        className="get-total-balance-button"
                      >
                        Get Total Balance
                      </button>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton>
                        <span
                          className="action_buttons"
                          onClick={() => handleEditDialogOpen(row)}
                        >
                          <EditNoteOutlined />
                        </span>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton>
                        <span
                          className="action_buttons"
                          onClick={() => handleDeleteSingle(row._id)}
                        >
                          {" "}
                          <DeleteOutlineOutlined />{" "}
                        </span>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                      <IconButton>
                        <span
                          className="action_buttons"
                          onClick={() => ViewAccountDetail(row)}
                        >
                          <VisibilityOutlined />{" "}
                        </span>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showDeleteIcon && (
        <div
          className={`delete-button-container ${
            showDeleteIcon ? "show" : "hide"
          }`}
          id="delete-container"
        >
          <button className="delete-button" onClick={handleDeleteSelected}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
