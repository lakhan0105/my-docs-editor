import React from "react";
import { useMyContext } from "../../Context/ContextProvider";
import { Navigate } from "react-router-dom";

function ProtectedAuth({ children }) {
  const { currUser } = useMyContext();

  // if the user has already loggedin do not let him go the the login/signup page
  if (currUser) {
    return <>{children}</>;
  }

  // if currUser is already present, take him back to "/" if he goes to "/login" or "/signup"
  return <Navigate to={"/"} />;
}

export default ProtectedAuth;
