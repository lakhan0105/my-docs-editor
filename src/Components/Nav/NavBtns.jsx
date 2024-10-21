import React from "react";
import { MyBtn } from "../index";

function NavBtns() {
  const data = [
    {
      id: 1,
      name: "login",
      extraStyles: "",
    },
    {
      id: 2,
      name: "signup",
      extraStyles: "signup-btn",
    },
  ];

  return (
    <div className="flex gap-4 absolut right-0">
      {data.map((item) => {
        const { id, name, extraStyles } = item;
        return (
          <MyBtn key={id} extraStyles={extraStyles}>
            {name}
          </MyBtn>
        );
      })}
    </div>
  );
}

export default NavBtns;
