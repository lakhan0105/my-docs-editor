import React from "react";
import { NavLink } from "react-router-dom";

function NavLinks({ extraStyles }) {
  const data = [
    { linkName: "home", path: "/" },
    { linkName: "about", path: "/about" },
    { linkName: "create", path: "/new-doc" },
    { linkName: "my documents", path: "/my-docs" },
  ];

  return (
    <ul className={`capitalize gap-10 translate-x-20`} style={extraStyles}>
      {data.map((item) => {
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
