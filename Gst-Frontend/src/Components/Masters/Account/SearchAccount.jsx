import { useRef, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";
const SearchAccount = ({
  AccountData,
  updateFilteredData,
  searchBox,
  setSearchBox,
  filterAccountData,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [gstinNumber, setGstinNumber] = useState("");
  const [companyType, setCompanyType] = useState("select-company-type");
  const [contactPerson, setContactPerson] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalOptions, setOriginalOptions] = useState([]);

  // Effect to filter data on every input change
  useEffect(() => {
    const filterData = () => {
      setLoading(true);
      let filteredCompanies = AccountData;

      // First , filter by account type
      if (filterAccountData !== "General") {
        filteredCompanies = filteredCompanies.filter(
          (item) => item.company_type === filterAccountData
        );
      }

      // Then apply search criteria
      filteredCompanies = filteredCompanies.filter((item) => {
        const nameMatch =
          companyName === "" ||
          item.company_name.toLowerCase().includes(companyName.toLowerCase()) ||
          item.contact_person.toLowerCase().includes(companyName.toLowerCase());

        const gstinMatch =
          gstinNumber === "" ||
          item.GSTIN.toLowerCase().includes(gstinNumber.toLowerCase());

        const contactPersonMatch =
          contactPerson === "" ||
          item.contact_person
            .toLowerCase()
            .includes(contactPerson.toLowerCase());

        const licenceNumberMatch =
          licenceNumber === "" ||
          item.license_number
            .toLowerCase()
            .includes(licenceNumber.toLowerCase());

        return (
          nameMatch && gstinMatch && contactPersonMatch && licenceNumberMatch
        );
      });

      updateFilteredData(filteredCompanies);
      setLoading(false);
    };

    // Debounce the filter function to avoid excessive calls
    const debounceTimer = setTimeout(() => {
      filterData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [
    companyName,
    gstinNumber,
    contactPerson,
    licenceNumber,
    AccountData,
    updateFilteredData,
    filterAccountData,
  ]);

  const handleshowAll = () => {
    // Reset all filters and show all data
    setTimeout(() => {
      setLoading(true);
      setCompanyName("");
      setGstinNumber("");
      setCompanyType("select-company-type");
      setContactPerson("");
      setLicenceNumber("");
      updateFilteredData(AccountData);
    }, 300);
    setLoading(false);
  };

  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCompanyName(inputValue);

    // Filter the AccountData based on the input value
    const filteredCompanies = originalOptions.filter((item) =>
      item.company_name.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Toggle showOptions based on whether there are matching results
    setShowOptions(filteredCompanies.length > 0);

    // Update dropdown options to show only matched results
    setDropdownOptions(filteredCompanies);

    // Reset filtered AccountData when input value is empty
    if (inputValue === "") {
      setFilteredData([]);
      updateFilteredData([]);
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
              <span>Search By Name : </span>
              <div className="custom-dropdown" ref={inputRef}>
                <input
                  type="text"
                  className="input-field"
                  value={companyName}
                  onChange={handleInputChange}
                  onClick={() => setShowOptions(true)}
                  placeholder="Enter Customer/Vendor"
                  style={{ width: "118%" }}
                />
                {showOptions && (
                  <div className="dropdown-options">
                    {dropdownOptions.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="option"
                        onClick={() => handleOptionClick(item.company_name)}
                      >
                        {item.company_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>Search By GSTIN:</span>
              <input
                className="input-field"
                placeholder="Enter Search GSTIN"
                style={{ width: "118%" }}
                value={gstinNumber}
                onChange={(e) => setGstinNumber(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column col-12 col-md-2 col-sm-2 col-xl-2">
              <span>Search By Company Type:</span>

              <select
                className="select-input-field"
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                style={{ width: "118%" }}
              >
                <option value="select-company-type">Select Company Type</option>
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
                <option value="customer/vendor">Customer / Vendor</option>
              </select>
            </div>
            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>Search By Contact Person:</span>
              <input
                className="input-field"
                placeholder="Enter search contact person"
                style={{ width: "118%" }}
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>Search By License No.:</span>
              <input
                className="input-field"
                placeholder="Enter search License No. "
                style={{ width: "118%" }}
                value={licenceNumber}
                onChange={(e) => setLicenceNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="search_btn col-12 col-md-4 col-lg-3 col-xl-1 mb-3 mx-3 p-1"
              onClick={handleshowAll}
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

export default SearchAccount;
