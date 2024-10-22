import React, { useEffect, useState } from "react";
import BigNavbar from "./BigNavbar";
import { useLocation } from "react-router-dom";

function Navbar() {
  const [isEditorPage, setIsEditorPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/new-doc")) {
      setIsEditorPage(true);
    } else {
      setIsEditorPage(false);
    }
  }, []);

  return (
    <nav className={`bg-${isEditorPage ? "white" : "red"}`}>
      <BigNavbar isEditorPage={isEditorPage} />
    </nav>
  );
}

export default Navbar;
