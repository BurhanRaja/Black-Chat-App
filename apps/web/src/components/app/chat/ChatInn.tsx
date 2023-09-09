import React from "react";

const ChatInn = () => {
  return (
    <>
      <div className="flex w-full mt-2 max-w-xl">
        <div
          className="flex-shrink-0 h-12 w-12 rounded-full"
          style={{
            backgroundImage: `url(/images/sideImage.jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></div>
        <div className="ms-3">
          <div className="text-white">
            <p className="flex items-center">
              <span className="text-orange-500 mr-2">BurhanRaja</span>{" "}
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInn;
