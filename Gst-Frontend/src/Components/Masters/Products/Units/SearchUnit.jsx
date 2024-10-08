import React, { useEffect, useState } from "react";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";
const SearchUnit = ({ UnitData, updateFilteredData, searchBox }) => {
  const [UnitName, setUnitName] = useState("");
  const [ShortName, setShortName] = useState("");

  useEffect(() => {
    const filterData = () => {
      const filteredUnit = UnitData.filter((item) => {
        const unitName =
          UnitName === "" ||
          (item.unit_name &&
            item.unit_name.toLowerCase().includes(UnitName.toLowerCase()));
        return unitName;
      });
      updateFilteredData(filteredUnit);
    };
    filterData();
  }, [UnitName, UnitData, updateFilteredData, searchBox]);
  return (
    <>
      {searchBox ? (
        <div className="row">
          <div className="container d-flex flex-wrap gap-5">
            <div className="d-flex flex-column col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
              <span>Search By Unit Name : </span>
              <div className="custom-dropdown">
                <input
                  type="text"
                  className="input-field"
                  // value={groupName}
                  // onChange={handleInputChange}
                  // onClick={() => setShowOptions(true)}
                  value={UnitName}
                  onChange={(e) => setUnitName(e.target.value)}
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

export default SearchUnit;
