import React from "react";
import { useMyContext } from "../../Context/ContextProvider";

function NoAccessAfterLogin({ children }) {
  const { currUser } = useMyContext();

  if (!currUser) {
    return <>{children}</>;
  }
}

export default NoAccessAfterLogin;
