import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../../Styles/Masters.css";
import { useState, useEffect } from "react";
import { formateDate } from "../../../../utils";
import { Checkbox, IconButton, LinearProgress, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DeleteOutlineOutlined,
  EditNoteOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import SearchProductGroup from "./SearchProductGroup";

const Product_Group = ({
  openAddDialog,
  openEditDialog,
  ProductGroupData,
  fetchProductGroupData,
  showToast,
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchBox, setSearchBox] = useState(false);

  const [filteredData, setFilteredData] = useState(ProductGroupData);

  const updateFilteredData = (newData) => {
    setFilteredData(newData);
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(ProductGroupData);
      setShowDeleteIcon(true);
    } else {
      setSelectedRows([]);
      setShowDeleteIcon(false);
    }
  };

  const handleCheckboxChange = (row) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }
    setShowDeleteIcon(newSelected.length > 0);

    setSelectedRows(newSelected);
  };

  const handleDeleteSelected = () => {
    const GroupIds = selectedRows.map((row) => row._id);
    if (!GroupIds || GroupIds.length === 0) {
      showToast("Invalid or empty GroupIds");
      return;
    }

    axios
      .post("/api/delete-multipal-product-group", {
        data: { GroupIds },
      })
      .then((res) => {
        if (res.data.status) {
          showToast(res.data.message, "success");
          setSelectedRows([]);
          setShowDeleteIcon(false);
          fetchProductGroupData();
        } else {
          showToast(res.data.message);
        }
      })
      .catch((error) => {
        showToast(error.message);
      });
  };

  const handleDeleteSingle = (GroupId) => {
    if (!GroupId) {
      showToast("Invalid customer ID");
      return;
    }

    axios
      .delete(`/api/delete-product-group/${GroupId}`)
      .then((res) => {
        if (res.data.status) {
          showToast(res.data.message, "success");
          fetchProductGroupData();
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
    fetchProductGroupData();
  }, []);
  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Product Group</h1>
          <div className="d-flex column-gap-4">
            <button onClick={handleSearchBox} className="search_btn">
              <SearchOutlinedIcon />
              Search
            </button>
            <button onClick={openAddDialog} className="add_account">
              <b>
                <AddIcon /> Add Product Group
              </b>
            </button>
          </div>
        </div>
        {/* Search component render and passed props here :- */}

        <div className={`search-box ${searchBox ? "show" : ""}`}>
          {/* {searchBox && (
            <SearchProduct
              ProductGroupData={ProductGroupData} // Make sure this matches the prop name in SearchProduct.jsx
              searchBox={searchBox}
              setSearchBox={setSearchBox}
              updateFilteredData={updateFilteredData}
            />
          )} */}
          {searchBox && (
            <SearchProductGroup
              productGroupData={ProductGroupData}
              updateFilteredData={updateFilteredData}
              searchBox={searchBox}
              setSearchBox={setSearchBox}
            />
          )}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "5%" }}>
                {ProductGroupData.length > 0 ? (
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < ProductGroupData.length
                    }
                    checked={
                      ProductGroupData.length > 0 &&
                      selectedRows.length === ProductGroupData.length
                    }
                    onChange={handleSelectAll}
                  />
                ) : (
                  " "
                )}
              </TableCell>
              <TableCell>
                <b>
                  <i>Product Group</i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Last Update </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i> Status </i>
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
            {searchBox ? (
              filteredData.length > 0 ? (
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
                      {row.title || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      {row.lastUpdate
                        ? formateDate(new Date(row.lastUpdate))
                        : "N/A"}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      Active
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton>
                          <span
                            className="action_buttons"
                            onClick={() =>
                              handleProductGroupEditDialogOpen(row)
                            }
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
                      {/* <Tooltip title="View">
                        <IconButton>
                          <span
                            className="action_buttons"
                            onClick={() => ViewProductDetail(row)}
                          >
                            <VisibilityOutlined />{" "}
                          </span>
                        </IconButton>
                      </Tooltip> */}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No matching data found
                  </TableCell>
                </TableRow>
              )
            ) : ProductGroupData.length > 0 ? (
              ProductGroupData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.indexOf(row) !== -1}
                      onChange={() => handleCheckboxChange(row)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.title || "NA"}
                  </TableCell>
                  <TableCell align="right">
                    {row.lastUpdate
                      ? formateDate(new Date(row.lastUpdate))
                      : "N/A"}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    Active
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton>
                        <span
                          className="action_buttons"
                          onClick={() => openEditDialog(row)}
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
                    {/* <Tooltip title="View">
                      <IconButton>
                        <span
                          className="action_buttons"
                          onClick={() => ViewProductDetail(row)}
                        >
                          <VisibilityOutlined />{" "}
                        </span>
                      </IconButton>
                    </Tooltip> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
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

export default Product_Group;
