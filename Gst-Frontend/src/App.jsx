import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Account from "./Components/Masters/Account/Account";

import AddAccountDialog from "./Components/Masters/Account/AddAccountDialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowAccountDetail from "./Components/Masters/Account/ShowAccountDetail";
import Product from "./Components/Masters/Products/Product";
import AddProductDialog from "./Components/Masters/Products/AddProductDialog";
import ShowProductDetail from "./Components/Masters/Products/ShowProductDetail";
import Product_Group from "./Components/Masters/Products/Product_Group/Product_Group";
import AddProductGroupDialog from "./Components/Masters/Products/Product_Group/AddProductGroupDialog";
import Unit from "./Components/Masters/Products/Units/Unit";
import AddUnitDialog from "./Components/Masters/Products/Units/AddUnitDialog";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [openAccountDetail, setOpenAccountDetail] = useState(false);
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const [AccountData, setAccountData] = useState([]);
  const [ProductData, setProductData] = useState([]);
  // const [ProductGroupData, setProductGroupData] = useState([]);
  const [selectedAccountData, setSelectedAccountData] = useState(null);
  const [filteredData, setFilterData] = useState([]);

  const [isProductDialog, setIsProductDialog] = useState(false);
  const [IsProductEditDialogOpen, setIsProductEditDialogOpen] = useState(false);
  // const [editProductGroupDialogOpen, setProductGroupDialogOpen] = useState(false);
  const [editProductGroupDialog, setEditProductGroupDialog] = useState(false);
  const [selectedProductItem, setSelectedProductItem] = useState(null);
  // const [selectedProductGroupItem , setSelectedProductGroupItem] = useState(null);

  // Product Group props state :-
  const [isProductGroupDialogOpen, setIsProductGroupDialogOpen] =
    useState(false);
  const [editProductGroupDialogOpen, setEditProductGroupDialogOpen] =
    useState(false);
  const [selectedProductGroupItem, setSelectedProductGroupItem] =
    useState(null);
  const [ProductGroupData, setProductGroupData] = useState([]);

  // Unit props state :-
  const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);
  const [editUnitDialogOpen, setEditUnitDialogOpen] = useState(false);
  const [selectedUnitItem, setSelectedUnitItem] = useState(null);
  const [UnitData, setUnitData] = useState([]);
  const ViewAccountDetail = (accountData) => {
    setSelectedAccountData(accountData);
    setOpenAccountDetail(true);
  };

  const ViewProductDetail = (productData) => {
    setSelectedProductItem(productData);
    setOpenProductDetail(true);
  };

  const hideProductDetail = () => {
    setOpenProductDetail(false);
  };

  const hideAccountDetail = () => {
    setOpenAccountDetail(false);
  };
  // Fetch the data from the API using useEffect
  const fetchAccountData = async () => {
    try {
      const response = await axios.get("/api/get-customer-vendor");
      if (response.data.status === 200 || response.status === 200) {
        setAccountData(response.data.data);

        console.log(response.data);
        console.log(response.data.data);
      } else {
        console.log("API did not return an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get("/api/get-product");
      if (response.data.status === 200 || response.status === 200) {
        setProductData(response.data.data);
      }
      console.log("product", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductGroupData = async () => {
    try {
      const response = await axios.get("/api/get-product-group");
      if (response.data.status === 200 || response.status === 200) {
        setProductGroupData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUnitData = async () => {
    try {
      const response = await axios.get("/api/get-unit");
      if (response.data.status === 200 || response.status === 200) {
        setUnitData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditDialogOpen(false); // Ensure edit dialog is also closed
    setSelectedItem(null);
  };
  const openProductDialog = () => {
    setIsProductDialog(true);
    setIsProductEditDialogOpen(false);
    setSelectedProductItem(null);
  };

  const closeProductDialog = () => {
    setIsProductDialog(false);
  };

  // Function to open add dialog
  const openAddProductGroupDialog = () => {
    setIsProductGroupDialogOpen(true);
  };
  const openAddUnitDialog = () => {
    setIsUnitDialogOpen(true);
    setEditUnitDialogOpen(false);
    setSelectedUnitItem(null)
    
  };
  // const closeProductGroupDialog = () => {
  //   setIsProductGroupDialog(false);
  // };

  const handleEditDialogOpen = (item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
    // setIsDialogOpen(true); // open the dialog;
  };

  const handleEditUnitDialog = (item) => {
    setSelectedUnitItem(item);
    setEditUnitDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setSelectedItem(null);
    setEditDialogOpen(false);
    setIsDialogOpen(false); // Close the main dialog as well
  };

  const EditDialogProductClose = () => {
    setIsProductEditDialogOpen(false);
    // setEditDialogOpen(false);
  };
  const handleProductEditDialogOpen = (item) => {
    setSelectedProductItem(item);
    setIsProductDialog(true);
    // setIsProductDialog(false);
  };

  // const openEditProductGroupDialog = (item)=>{
  //   setSelectedProductGroupItem(item);
  //   setProductGroupDialogOpen(true);

  // }
  // Function to open edit dialog
  const openEditProductGroupDialog = (item) => {
    setSelectedProductGroupItem(item);
    setEditProductGroupDialogOpen(true);
  };

  // Function to close dialog
  const closeProductGroupDialog = () => {
    setIsProductGroupDialogOpen(false);
    setEditProductGroupDialogOpen(false);
    setSelectedProductGroupItem(null);
  };

  const CloseUnitDialog = () => {
    setEditUnitDialogOpen(false);
    // setEditDialogOpen(false);
    setIsUnitDialogOpen(false);
  };
  // const EditDialogProductGroupClose = () => {
  //   setEditProductGroupDialog(false);
  //   setEditDialogOpen(false)
  // };

  const showToast = (message, type = "error") => {
    if (type === "success") {
      toast.success(message, { position: "top-right", autoClose: 3000 });
    } else {
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  const updateFilteredData = (newData) => {
    setFilterData(newData);
  };
  useEffect(() => {
    fetchAccountData();
    fetchProductData();
    fetchProductGroupData();
    fetchUnitData();
  }, []);
  return (
    <>
      <div>
        {/* Routes should only be used once under a single Router */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          // transition:Bounce
        />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          {/* <Route path="/Masters" element={<Masters />} />{" "} */}
          <Route
            path="/Masters/Account"
            element={
              <Account
                handleEditDialogOpen={handleEditDialogOpen}
                openDialog={openDialog}
                AccountData={AccountData}
                fetchAccountData={fetchAccountData}
                showToast={showToast}
                ViewAccountDetail={ViewAccountDetail}
                updateFilteredData={updateFilteredData}
                filteredData={filteredData}
                setFilterData={setFilterData}
              />
            }
          />{" "}
          <Route
            path="/Masters/Product"
            element={
              <Product
                handleProductEditDialogOpen={handleProductEditDialogOpen}
                // openDialog={openDialog}
                openDialog={openProductDialog}
                ProductData={ProductData}
                fetchProductData={fetchProductData}
                showToast={showToast}
                ViewProductDetail={ViewProductDetail}
                updateFilteredData={updateFilteredData}
                filteredData={filteredData}
                setFilterData={setFilterData}
                ProductGroupData={ProductGroupData}
              />
            }
          />{" "}
          <Route
            path="/Masters/Product/Group"
            element={
              <Product_Group
                openAddDialog={openAddProductGroupDialog}
                openEditDialog={openEditProductGroupDialog}
                ProductGroupData={ProductGroupData}
                fetchProductGroupData={fetchProductGroupData}
                showToast={showToast}
              />
            }
          />
          <Route
            path="/Masters/Unit"
            element={
              <Unit
                openAddDialog={openAddUnitDialog}
                openEditDialog={handleEditUnitDialog}
                UnitData={UnitData}
                fetchUnitData={fetchUnitData}
                showToast={showToast}
              />
            }
          />
        </Routes>

        <AddAccountDialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          editDialogOpen={editDialogOpen}
          onCloseEditDialog={handleEditDialogClose}
          selectedItem={selectedItem}
          fetchAccountData={fetchAccountData}
          showToast={showToast}
        />
        <AddProductDialog
          isOpen={isProductDialog}
          onClose={closeProductDialog}
          onCloseEditDialog={EditDialogProductClose}
          selectedProductItem={selectedProductItem}
          fetchProductData={fetchProductData}
          showToast={showToast} // Add this line
          UnitData={UnitData}
          ProductGroupData={ProductGroupData}
          fetchProductGroupData={fetchProductGroupData}
        />

        <AddProductGroupDialog
          isOpen={isProductGroupDialogOpen || editProductGroupDialogOpen}
          onClose={closeProductGroupDialog}
          selectedItem={selectedProductGroupItem}
          fetchProductGroupData={fetchProductGroupData}
          showToast={showToast} // Add this line
        />

        <AddUnitDialog
          isOpen={isUnitDialogOpen || editUnitDialogOpen}
          onClose={CloseUnitDialog}
          selectedUnitItems={selectedUnitItem}
          fetchUnitData={fetchUnitData}
          showToast={showToast} // Add this line
        />
        <ShowAccountDetail
          ViewAccountDetail={ViewAccountDetail}
          openAccountDetail={openAccountDetail}
          hideAccountDetail={hideAccountDetail}
          selectedAccountData={selectedAccountData}
        />
        <ShowProductDetail
          ViewProductDetail={ViewProductDetail}
          openProductDetail={openProductDetail}
          hideProductDetail={hideProductDetail}
          selectedProductItem={selectedProductItem}
        />
      </div>
    </>
  );
}

export default App;
