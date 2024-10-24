import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { Client, Account } from "appwrite";
import { v4 as uuidv4 } from "uuid";
import { getFromLS, setLS } from "../utils/localStorage";

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const client = new Client().setEndpoint(endpoint).setProject(projectId);

const myContext = createContext();
function ContextProvider({ children }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [currUser, setCurrUser] = useState(getFromLS("currUser"));

  // setLS when the currUser changes
  useEffect(() => {
    if (currUser) {
      setLS("currUser", currUser);
    }
  }, [currUser]);

  // function to handle change in form data(for both login and signup)
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  }

  // function to create new user
  async function createUser(e) {
    e.preventDefault();
    const account = new Account(client);

    try {
      const result = await account.create(
        uuidv4(),
        formData?.email,
        formData?.password
      );

      // if result then login ther user using loginUser function
      if (result) {
        loginUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function to login the user
  const loginUser = async (e) => {
    e.preventDefault();
    console.log("running login user function");
    const account = new Account(client);

    try {
      const result = await account.createEmailPasswordSession(
        formData.email, // email
        formData.password // password
      );

      if (result) setCurrUser(result);
      // useEffect will setLS the curr user after the above code
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <myContext.Provider
      value={{ formData, handleChange, createUser, currUser, loginUser }}
    >
      {children}
    </myContext.Provider>
  );
}

// useContext
function useMyContext() {
  return useContext(myContext);
}

export default ContextProvider;
export { useMyContext };
