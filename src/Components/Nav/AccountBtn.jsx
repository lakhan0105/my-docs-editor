import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import AccountCard from "./AccountCard";
import { useMyContext } from "../../Context/ContextProvider";

function AccountBtn() {
  const [showCard, setShowCard] = useState(false);
  const { currUser } = useMyContext();

  function toggleAccountcard() {
    setShowCard((prev) => !prev);
  }

  // show the accountbtn oly when the user is present
  if (currUser) {
    return (
      <div className="relative">
        <button className="text-3xl text-amber-500" onClick={toggleAccountcard}>
          <FaRegUserCircle />
        </button>

        {showCard && <AccountCard />}
      </div>
    );
  }
}

export default AccountBtn;
