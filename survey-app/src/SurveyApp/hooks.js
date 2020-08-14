import { useState } from "react";
// import $ from "jquery";

export const useInputChange = (customValue, callback) => {
  const [value, setValue] = useState(customValue);
  console.log(customValue);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (callback) {
      callback(event.target.name, newValue);
    }
    console.log(event.target.value);
  };
  console.log(value);
  return {
    value: value,
    handleChange: handleChange,
  };
};
