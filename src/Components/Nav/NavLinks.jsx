import React from "react";

function NavLinks({ extraStyles }) {
  const data = [
    { linkName: "home", path: "/" },
    { linkName: "about", path: "/about" },
    { linkName: "create", path: "/create" },
    { linkName: "my documents", path: "/my-docs" },
  ];

  return (
    <ul className={`capitalize gap-10 translate-x-20`} style={extraStyles}>
      {data.map((item) => {
        const { linkName, path } = item;
        return (
          <li key={linkName}>
            <a href={path}>{linkName}</a>
          </li>
        );
      })}
    </ul>
  );
}

export default NavLinks;
