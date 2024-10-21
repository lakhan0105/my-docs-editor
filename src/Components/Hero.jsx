import React, { useEffect, useState } from "react";
import MyBtn from "./MyBtn";

import oneImg from "../assets/profile-imgs/one.png";
import twoImg from "../assets/profile-imgs/two.png";
import threeImg from "../assets/profile-imgs/three.png";

function Hero() {
  const dummyUsersData = [
    { id: 1, img: oneImg },
    { id: 2, img: twoImg },
    { id: 3, img: threeImg },
  ];

  // state for user number count (dummy)
  const [userNum, setUserNum] = useState(0);

  // function to increase user numbers animation
  function increasingNumber() {
    setInterval(() => {
      setUserNum((prev) => {
        while (prev < 12) {
          return prev + 1;
        }
        return prev;
      });
    }, 100);
    return userNum;
  }

  useEffect(() => {
    increasingNumber();
  }, []);

  return (
    <section className="max-w-[1200px] m-auto h-[calc(100vh-70px)] ">
      <div className="text-center pt-48 max-w-[85%] m-auto">
        {/* hero heading */}
        <h2 className="font-bold text-7xl">
          Access, edit, and share your documents instantly
        </h2>

        {/* hero subheading */}
        <p className="mt-4 text-center text-xl max-w-[75%] m-auto text-[#D3D3D3]/80 leading-normal">
          Quickly create, edit, and save your documents online. Easily
          accessible from anywhere and no setup is required.
        </p>

        {/* create document button */}
        <MyBtn
          extraStyles={`mt-7 text-2xl rounded-lg text-[#fff] bg-cyan-700 py-2 block m-auto`}
        >
          Create new document
        </MyBtn>

        {/* dummy users profile dps */}
        <div className="mt-14">
          <div className="inline-block relative min-w-[150px] max-w-[400px] min-h-[60px]">
            {dummyUsersData.map((data, index) => {
              const { id, img } = data;
              return (
                <img
                  className={`w-[62px] absolute inline-block`}
                  style={{ left: `${index * 30}%` }}
                  key={id}
                  src={img}
                />
              );
            })}
          </div>

          <div className="text text-[#d3d3d3]/80 mt-1.5">
            Trusted by{" "}
            <span className="text-[#d3d3d3] font-semibold">{userNum}+</span>{" "}
            users for document editing
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
