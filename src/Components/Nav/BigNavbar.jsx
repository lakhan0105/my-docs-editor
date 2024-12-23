import React, { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import NavBtns from "./NavBtns";
import AccountBtn from "./AccountBtn";

function BigNavbar({ isEditorPage }) {
  // extra styles fot the navLinks in bigNavbar
  const extraStyles = {
    display: "flex",
  };

  return (
    <div className="flex justify-between items-center max-w-[1400px] m-auto h-[70px] text-lg">
      {!isEditorPage ? <NavLinks extraStyles={extraStyles} /> : <div></div>}
      <NavBtns />
      <AccountBtn />
    </div>
  );
}

export default BigNavbar;
