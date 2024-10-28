import React, { useEffect } from "react";
import MyBtn from "../MyBtn";
import { useMyContext } from "../../Context/ContextProvider";
import { Account } from "appwrite";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const { currUser, setCurrUser, setFormData, client } = useMyContext();
  const navigate = useNavigate();

  // handleLogout function
  async function handleLogout() {
    const account = new Account(client);

    try {
      const result = await account.deleteSessions();

      if (result) {
        setFormData(null);
        setCurrUser(null);
        localStorage.removeItem("currUser");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (currUser) {
    return <MyBtn handleMyBtn={handleLogout}>Logout</MyBtn>;
  }
}

export default LogoutBtn;
