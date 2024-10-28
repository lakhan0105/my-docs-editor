import React from "react";
import { NavLink } from "react-router-dom";
import { useMyContext } from "../../Context/ContextProvider";

function NavLinks({ extraStyles }) {
  const { currUser } = useMyContext();

  const data = [
    { linkName: "home", path: "/" },
    { linkName: "about", path: "/about" },
    { linkName: "create", path: `/doc/new` },
    { linkName: "my documents", path: "/user-docs" },
  ];

  // if user is loggedin, then render data array, else filter the data where mydocuments link is removed
  const filteredData = currUser
    ? data
    : data?.filter((item) => {
        if (item.linkName !== "my documents") {
          return item;
        }
      });

  return (
    <ul className={`capitalize gap-10 translate-x-20`} style={extraStyles}>
      {filteredData.map((item) => {
        const { linkName, path } = item;
        return (
          <li key={linkName}>
            <NavLink to={path}>{linkName}</NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default NavLinks;
