import React from "react";

const Button = ({ props }) => {
  return (
    <button
      type="submit"
      className="h-fit w-fit mt-3 bg-buttonBG outline-none text-white py-3 px-5 text-sm rounded-md"
    >
      {props}
    </button>
  );
};

export default Button;
