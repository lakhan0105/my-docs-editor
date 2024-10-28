import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { Client, Account, Databases } from "appwrite";
import { v4 as uuidv4 } from "uuid";
import { getFromLS, setLS } from "../utils/localStorage";

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
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

  // function to create new document
  const saveNewDoc = async (docData, navigate) => {
    const databases = new Databases(client);
    try {
      const result = await databases.createDocument(
        databaseId, // databaseId
        collectionId, // collectionId
        docData?.docId, // documentId
        docData // data
      );

      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to update and save the document (which is already been saved in the backend)
  const updateAndSave = async (updatedDocData, navigate) => {
    const databases = new Databases(client);
    console.log("running update and save function");
    console.log(updatedDocData);

    try {
      const result = await databases.updateDocument(
        databaseId, // databaseId
        collectionId, // collectionId
        updatedDocData?.docId, // documentId
        updatedDocData // data (optional)
      );
      if (result) {
        navigate("/");
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <myContext.Provider
      value={{
        formData,
        setFormData,
        currUser,
        setCurrUser,
        handleChange,
        createUser,
        saveNewDoc,
        updateAndSave,
        client,
        databaseId,
        collectionId,
      }}
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
