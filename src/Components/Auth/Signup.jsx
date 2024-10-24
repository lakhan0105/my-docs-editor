import React, { useEffect } from "react";
import FormRow from "./InputFormEls/FormRow";
import MyBtn from "../MyBtn";
import { NavLink, useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/ContextProvider";

function Signup() {
  const { formData, handleChange, createUser, currUser } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("running useeffect in signup");
    if (currUser) {
      navigate("/");
    }
  }, [currUser]);

  return (
    <section>
      <form className="border border-white/40 rounded-xl max-w-[450px] m-auto mt-32 py-10 px-9 bg-gradient-to-bl from-[#252525] to-[#1a1a1a] backdrop-blur-xl">
        <div className="text-center mb-9">
          <h2 className="text-3xl text-white font-semibold mb-1">Welcome</h2>
          <p className="text-white/50 text-sm">
            Please enter your credentials to Signup
          </p>
        </div>

        <FormRow
          name={"email"}
          label={"Email"}
          type={"email"}
          placeholder={"Enter your email"}
          handleChange={handleChange}
          value={formData?.email}
        />

        <FormRow
          name={"password"}
          label={"Create password"}
          type={"password"}
          placeholder={"••••••"}
          handleChange={handleChange}
          value={formData?.password}
        />

        <MyBtn
          extraStyles={
            "rounded-md ring-1 ring-white/20 bg-[#633a97] w-[100%] py-1.5 font-bold text-lg hover:bg-[#7752a5] mt-4"
          }
          handleMyBtn={createUser}
        >
          Signup
        </MyBtn>

        <p className="mt-4 text-sm text-center text-white/70">
          Already a member?{" "}
          <NavLink
            to={"/login"}
            className="underline ml-1 text-blue-300 hover:text-white"
          >
            Login
          </NavLink>
        </p>
      </form>
    </section>
  );
}

export default Signup;
