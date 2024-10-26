import React, { useEffect, useState } from "react";
import BigNavbar from "./BigNavbar";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [isEditorPage, setIsEditorPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // change the style of the navrbar if the path starts with /doc
    if (location.pathname.startsWith("/doc")) {
      setIsEditorPage(true);
    } else {
      setIsEditorPage(false);
    }
  }, [isEditorPage, location]);

  return (
    <nav className={`bg-${isEditorPage ? "white" : "red"}`}>
      <BigNavbar isEditorPage={isEditorPage} />
    </nav>
  );
}

export default Navbar;
