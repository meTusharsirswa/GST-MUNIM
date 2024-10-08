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
import SearchUnit from "./SearchUnit";
// import SearchProductGroup from "./SearchProductGroup";

const Unit = ({
  openAddDialog,
  openEditDialog,
  UnitData,
  fetchUnitData,
  showToast,
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchBox, setSearchBox] = useState(false);

  const [filteredData, setFilteredData] = useState(UnitData);

  const updateFilteredData = (newData) => {
    setFilteredData(newData);
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(UnitData);
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
    const UnitIds = selectedRows.map((row) => row._id);
    if (!UnitIds || UnitIds.length === 0) {
      showToast("Invalid or empty UnitIds");
      return;
    }

    axios
      .post("/api/delete-multipal-unit", {
        data: { UnitIds },
      })
      .then((res) => {
        if (res.data.status) {
          showToast(res.data.message, "success");
          setSelectedRows([]);
          setShowDeleteIcon(false);
          fetchUnitData();
        } else {
          showToast(res.data.message);
        }
      })
      .catch((error) => {
        showToast(error.message);
      });
  };

  const handleDeleteSingle = (UnitId) => {
    if (!UnitId) {
      showToast("Invalid customer ID");
      return;
    }

    axios
      .delete(`/api/delete-unit/${UnitId}`)
      .then((res) => {
        if (res.data.status) {
          showToast(res.data.message, "success");
          fetchUnitData();
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
    fetchUnitData();
  }, []);
  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Unit Of Mesurements</h1>
          <div className="d-flex column-gap-4">
            <button onClick={handleSearchBox} className="search_btn">
              <SearchOutlinedIcon />
              Search
            </button>
            <button onClick={openAddDialog} className="add_account">
              <b>
                <AddIcon /> Add Unit
              </b>
            </button>
          </div>
        </div>
        {/* Search component render and passed props here :- */}

        <div className={`search-box ${searchBox ? "show" : ""}`}>
          {searchBox && (
            <SearchUnit
              UnitData={UnitData}
              updateFilteredData={updateFilteredData}
              searchBox={searchBox} 
            />
          )}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "5%" }}>
                {UnitData.length > 0 ? (
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < UnitData.length
                    }
                    checked={
                      UnitData.length > 0 &&
                      selectedRows.length === UnitData.length
                    }
                    onChange={handleSelectAll}
                  />
                ) : (
                  " "
                )}
              </TableCell>
              <TableCell>
                <b>
                  <i>Unit Name</i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Short Name </i>
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
                      {row.unit_name || "NA"}
                    </TableCell>
                    <TableCell align="right">{row.short_name}</TableCell>
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
            ) : UnitData.length > 0 ? (
              UnitData.map((row, index) => (
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
                    {row.unit_name || "NA"}
                  </TableCell>
                  <TableCell align="right">{row.short_name || "NA"}</TableCell>
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

export default Unit;
