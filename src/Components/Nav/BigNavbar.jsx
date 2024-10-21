import React from "react";
import NavLinks from "./NavLinks";
import NavBtns from "./NavBtns";

function BigNavbar() {
  // extra styles fot the navLinks in bigNavbar
  const extraStyles = {
    display: "flex",
  };

  return (
    <div className="flex justify-between items-center max-w-[1200px] m-auto relativ h-[70px] text-lg">
      <NavLinks extraStyles={extraStyles} />
      <NavBtns />
    </div>
  );
}

export default BigNavbar;
