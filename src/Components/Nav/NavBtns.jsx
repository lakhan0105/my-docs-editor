import React from "react";
import { MyBtn } from "../index";
import { NavLink } from "react-router-dom";
import { useMyContext } from "../../Context/ContextProvider";

function NavBtns() {
  // get currUser from context
  const { currUser } = useMyContext();

  // btns data
  const data = [
    {
      id: 1,
      name: "login",
      path: "/login",
      extraStyles: "",
    },
    {
      id: 2,
      name: "signup",
      path: "/signup",
      extraStyles: "signup-btn",
    },
  ];

  // if currUser is not present, then show the login and signup btns
  if (!currUser) {
    return (
      <div className="flex gap-4 absolut right-0">
        {data.map((item) => {
          const { id, name, extraStyles, path } = item;
          return (
            <NavLink to={path} key={id}>
              <MyBtn extraStyles={extraStyles}>{name}</MyBtn>
            </NavLink>
          );
        })}
      </div>
    );
  }
}

export default NavBtns;
