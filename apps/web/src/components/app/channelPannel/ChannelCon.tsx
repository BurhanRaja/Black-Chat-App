import React from "react";

const ChannelCon = () => {
  return (
    <>
      <button
        className="transform rounded-lg px-2 transition-all mx-auto duration-300 ease-out cursor-pointer channel-icon hover:scale-105"
        style={{
          backgroundImage: `url(/images/sideImage.jpg)`,
          backgroundColor: "black",
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          margin: "10px 0",
        }}
      ></button>
    </>
  );
};

export default ChannelCon;
