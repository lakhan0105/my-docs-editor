import React, { useEffect, useState } from "react";
import { FormRow, MyBtn } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/ContextProvider";
import { Account } from "appwrite";

function Login() {
  const { formData, handleChange, currUser, setCurrUser, client } =
    useMyContext();
  const navigate = useNavigate();

  // function to login the user
  const loginUser = async (e) => {
    e.preventDefault();
    const account = new Account(client);

    try {
      const result = await account.createEmailPasswordSession(
        formData.email, // email
        formData.password // password
      );

      if (result) {
        setCurrUser(result);
        navigate("/");
      }
      // useEffect will setLS the curr user after the above code
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
      <form className="border border-white/40 rounded-xl max-w-[450px] m-auto mt-32 py-10 px-9 bg-gradient-to-bl from-[#252525] to-[#1a1a1a] backdrop-blur-xl">
        <div className="text-center mb-9">
          <h2 className="text-3xl text-white font-semibold mb-1">Welcome</h2>
          <p className="text-white/50 text-sm">
            Please enter your credentials to login
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
          label={"Password"}
          type={"password"}
          placeholder={"••••••"}
          handleChange={handleChange}
          value={formData?.password}
        />

        <MyBtn
          extraStyles={
            "rounded-md ring-1 ring-white/20 bg-[#633a97] w-[100%] py-1.5 font-bold text-lg hover:bg-[#7752a5] mt-4"
          }
          handleMyBtn={loginUser}
        >
          Login
        </MyBtn>

        <p className="mt-4 text-sm text-center text-white/70">
          Don't have an account?{" "}
          <NavLink
            to={"/signup"}
            className="underline ml-1 text-blue-300 hover:text-white"
          >
            Sign up
          </NavLink>
        </p>
      </form>
    </section>
  );
}

export default Login;
