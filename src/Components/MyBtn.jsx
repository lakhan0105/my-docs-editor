import React from "react";
import { useMyContext } from "../Context/ContextProvider";

function MyBtn({ children, extraStyles, handleMyBtn }) {
  return (
    <button
      className={`ring-1 ring-[#333]/30 bg-[#000] capitalize px-4 py-1 rounded-2xl ${extraStyles}`}
      onClick={handleMyBtn}
    >
      {children}
    </button>
  );
}

export default MyBtn;
