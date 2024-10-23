import React from "react";
import { useContext } from "react";
import { createContext } from "react";

// createContext
const myContext = createContext();

function ContextProvider({ children }) {
  return (
    <myContext.Provider value={"something"}>{children}</myContext.Provider>
  );
}

// useContext
function useMyContext() {
  return useContext(myContext);
}

export default ContextProvider;
export { useMyContext };
