import React from "react";
import { MyBtn } from "../index";
import { NavLink } from "react-router-dom";

function NavBtns() {
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

export default NavBtns;
