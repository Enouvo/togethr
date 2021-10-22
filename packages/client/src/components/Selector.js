import React from "react";
import Select from "react-select";

const Selector = ({ options }) => {
    
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "blue" : "black",
      fontWeight: "bold",
      backgroundColor: "rgba(0,0,0,0)",
    }),
    control: () => ({
      display: "flex",
      flexDirection: "row",
      borderRadius: "0.5rem",
      borderWidth: 2,
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft: 2,
      paddingRight: 2,
      color: "#4a5568",
      fontWeight: "bold",
    }),
  };
  
  return (
    <Select
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={customStyles}
      options={options}
      className="text-gray-700"
      isClearable
    />
  );
};

export default Selector;
