import React from "react";
import LogoutBtn from "./LogoutBtn";
import { useMyContext } from "../../Context/ContextProvider";

function AccountCard() {
  const { currUser } = useMyContext();

  return (
    <article className="account-card ring-1 ring-white/20 absolute w-[200px] bottom-100 translate-x-[-40%] rounded-md p-2 px-3 bg-[#1c1c21] text-center">
      <h2 className="mb-3 text-sm">
        userId <span className="block text-white/70">{currUser?.userId}</span>
      </h2>
      <LogoutBtn />
    </article>
  );
}

export default AccountCard;
