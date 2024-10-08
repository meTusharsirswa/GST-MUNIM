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

import { Checkbox, IconButton, LinearProgress, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DeleteOutlineOutlined,
  EditNoteOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import SearchProduct from "./SearchProduct";
// import SearchAccount from "./SearchAccount";

const Product = ({
  filteredData,
  handleProductEditDialogOpen,
  openDialog,
  ProductData,
  fetchProductData,
  showToast,
  ViewProductDetail,
  updateFilteredData,
  ProductGroupData,
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchBox, setSearchBox] = useState(false);

  const handleSelectAll = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    const updatedSelectedRows = updatedSelectAll ? ProductData : [];
    setSelectedRows(updatedSelectedRows);
    setShowDeleteIcon(updatedSelectedRows.length > 0);
  };

  const handleCheckboxChange = (row) => {
    const updatedSelectedRows = selectedRows.includes(row)
      ? selectedRows.filter((selectedRow) => selectedRow !== row)
      : [...selectedRows, row];

    setSelectedRows(updatedSelectedRows);
    setShowDeleteIcon(updatedSelectedRows.length > 0);
  };

  const handleDeleteSelected = () => {
    const productIds = selectedRows.map((row) => row._id);
    if (!productIds || productIds.length === 0) {
      showToast("Invalid or empty productIds");
      return;
    }

    axios
      .post("/api/delete-multipal-product", {
        data: { productIds },
      })
      .then((res) => {
        if (res.data.status) {
          showToast(res.data.message, "success");
          setSelectedRows([]);
          setShowDeleteIcon(false);
          fetchProductData();
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
      .delete(`/api/delete-product/${customerId}`)
      .then((res) => {
        if (res.data.status) {
          showToast(res.data.message, "success");
          fetchProductData();
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
    fetchProductData();
  }, []);
  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Product</h1>
          <div className="d-flex column-gap-4">
            <button onClick={handleSearchBox} className="search_btn">
              <SearchOutlinedIcon />
              Search
            </button>
            <button onClick={() => openDialog()} className="add_account">
              <b>
                <AddIcon /> Add Product
              </b>
            </button>
          </div>
        </div>
        {/* Search component render and passed props here :- */}

        <div className={`search-box ${searchBox ? "show" : ""}`}>
          {searchBox && (
            <SearchProduct
              productData={ProductData} // Make sure this matches the prop name in SearchProduct.jsx
              searchBox={searchBox}
              setSearchBox={setSearchBox}
              updateFilteredData={updateFilteredData}
            />
          )}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "5%" }}>
                {ProductData.length > 0 ? (
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                ) : (
                  " "
                )}
              </TableCell>
              <TableCell>
                <b>
                  <i>Name</i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Product Group </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Purchase Price </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Sell Price </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>HSN Code </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>UOM </i>
                </b>
              </TableCell>
              <TableCell align="right">
                <b>
                  <i>Current </i>
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
                      {row.product_name || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      {ProductGroupData.find(
                        (group) => group._id === row.product_group._id
                      )?.title || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      {row.purchase_price || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      {row.sell_price || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      {row.HSN_SAS_code || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      {row.unit_of_measurement || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      {row.unit_of_measurement || "NA"}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton>
                          <span
                            className="action_buttons"
                            onClick={() => handleProductEditDialogOpen(row)}
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
                            onClick={() => ViewProductDetail(row)}
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
                  <TableCell colSpan={9} align="center">
                    No matching data found
                  </TableCell>
                </TableRow>
              )
            ) : ProductData.length > 0 ? (
              ProductData.map((row, index) => (
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
                    {row.product_name || "NA"}
                  </TableCell>
                  <TableCell align="right">
                    {/* {row.product_group ? row.product_group.toString() : "NA"} */}
                    {ProductGroupData.find(
                      (group) => group._id === row.product_group._id
                    )?.title || "NA"}
                  </TableCell>
                  <TableCell align="right">
                    {row.purchase_price || "NA"}
                  </TableCell>
                  <TableCell align="right">{row.sell_price || "NA"}</TableCell>
                  <TableCell align="right">
                    {row.HSN_SAS_code || "NA"}
                  </TableCell>
                  <TableCell align="right">
                    {row.unit_of_measurement || "NA"}
                  </TableCell>
                  <TableCell align="right">
                    {row.unit_of_measurement || "NA"}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton>
                        <span
                          className="action_buttons"
                          onClick={() => handleProductEditDialogOpen(row)}
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
                          onClick={() => ViewProductDetail(row)}
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

export default Product;
