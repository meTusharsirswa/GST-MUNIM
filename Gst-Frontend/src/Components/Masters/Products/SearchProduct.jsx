import { useRef, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";
const SearchProduct = ({ productData, searchBox, updateFilteredData }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [Hsn_code, setHsn_code] = useState("");
  const [product_group, setProductGroup] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalOptions, setOriginalOptions] = useState([]);

  // Effect to filter data on every input change
  useEffect(() => {
    const filterData = () => {
      setLoading(true);
      if (!productData) {
        console.error("productData is undefined");
        setLoading(false);
        return;
      }

      let filteredProductData = productData.filter((item) => {
        const nameMatch =
          productName === "" ||
          item.product_name.toLowerCase().includes(productName.toLowerCase());
        const descriptionMatch =
          description === "" ||
          item.description.toLowerCase().includes(description.toLowerCase());
        const hsnMatch =
          Hsn_code === "" ||
          item.HSN_SAS_code.toLowerCase().includes(Hsn_code.toLowerCase());
        const ProductGroupMatch =
          product_group === "" ||
          (item.product_group &&
           item.product_group.title &&
           item.product_group.title.toLowerCase().includes(product_group.toLowerCase()));
      
        return nameMatch && descriptionMatch && hsnMatch && ProductGroupMatch;
      });
      
      updateFilteredData(filteredProductData);
      setLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      filterData();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [
    productName,
    description,
    Hsn_code,
    product_group,
    productData,
    updateFilteredData,
  ]);

  const handleResetForm = () => {
    // Reset all filters
    setTimeout(() => {
      setLoading(true);
      setProductName("");
      setDescription("");
      setHsn_code("");
      setProductGroup("");
    }, 400);
    setLoading(false);
  };

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setProductName(inputValue);

    // Filter the AccountData based on the input value
    const filteredCompanies = originalOptions.filter((item) =>
      item.product_name.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Toggle showOptions based on whether there are matching results
    setShowOptions(filteredCompanies.length > 0);

    // Update dropdown options to show only matched results
    setDropdownOptions(filteredCompanies);

    // Reset filtered AccountData when input value is empty
    if (inputValue === "") {
      setFilteredData([]);
      //   updateFilteredData([]);
      setDropdownOptions(originalOptions);
    }
  };

  const handleOptionClick = (selectedCompany) => {
    setCompanyName(selectedCompany);
    setShowOptions(false);
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      // Click is outside the input, hide showOptions
      setShowOptions(false);
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div
          className="d-flex justify-content-center mx-auto"
          style={{ zIndex: 9999 }}
        >
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <>
      {searchBox ? (
        <div className="row">
          <div className="container d-flex flex-wrap gap-5">
            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>Product Name : </span>
              <div className="custom-dropdown" ref={inputRef}>
                <input
                  type="text"
                  className="input-field"
                  value={productName}
                  onChange={handleInputChange}
                  onClick={() => setShowOptions(true)}
                  placeholder="Product Name"
                  style={{ width: "118%" }}
                />
                {showOptions && (
                  <div className="dropdown-options">
                    {dropdownOptions.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="option"
                        onClick={() => handleOptionClick(item.product_name)}
                      >
                        {item.product_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>Product Description :</span>
              <input
                className="input-field"
                placeholder="Product Description "
                style={{ width: "118%" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>HSN Code :</span>
              <input
                className="input-field"
                placeholder="HSN Code"
                style={{ width: "118%" }}
                value={Hsn_code}
                onChange={(e) => setHsn_code(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>Product Group :</span>
              <input
                className="input-field"
                placeholder="Product Group  "
                style={{ width: "118%" }}
                value={product_group}
                onChange={(e) => setProductGroup(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="search_btn col-12 col-md-4 col-lg-3 col-xl-1 mb-3 mx-3 p-1"
              onClick={handleResetForm}
            >
              <RestartAltSharpIcon fontSize="small" /> Reset
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchProduct;
