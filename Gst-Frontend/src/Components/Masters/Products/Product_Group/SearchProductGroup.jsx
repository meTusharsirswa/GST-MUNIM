// SearchProductGroup.jsx
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";

const SearchProductGroup = ({
  productGroupData,
  updateFilteredData,
  searchBox,
}) => {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  // Effect to filter data on group name change
  useEffect(() => {
    const filterData = () => {
      const filteredGroups = productGroupData.filter((item) => {
        const GroupName =
          groupName === "" ||
          (item.title &&
            item.title.toLowerCase().includes(groupName.toLowerCase()));
        return GroupName;
      });
      updateFilteredData(filteredGroups);
      setLoading(false);
    };

    filterData();
  }, [groupName, productGroupData, updateFilteredData, searchBox]);

  // Handle input change
  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {searchBox ? (
        <div className="row">
          <div className="container d-flex flex-wrap gap-5">
            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>Search By Product Group Name : </span>
              <div className="custom-dropdown">
                <input
                  type="text"
                  className="input-field"
                  value={groupName}
                  onChange={handleInputChange}
                  // onClick={() => setShowOptions(true)}
                  placeholder="Product Name"
                  style={{ width: "140%" }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="search_btn col-12 col-md-4 col-lg-3 col-xl-1 mb-3 mx-3 p-1"
              onClick={() => setGroupName("")}
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

export default SearchProductGroup;
