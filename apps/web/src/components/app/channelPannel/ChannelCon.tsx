import React from "react";

const ChannelCon = () => {
  return (
    <>
      <button
        className="transform p-6 transition-all mx-auto rounded-lg duration-300 ease-out cursor-pointer channel-icon"
        style={{
          backgroundImage: `url(/images/sideImage.jpg)`,
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
