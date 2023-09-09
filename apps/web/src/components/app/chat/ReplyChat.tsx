import React from "react";

const ReplyChat = () => {
  return (
    <>
      <div className="flex w-full my-3 mt-7 max-w-xl  chat-reply">
        <div
          className="flex-shrink-0 h-12 w-12 rounded-full"
          style={{
            backgroundImage: `url(/images/sideImage.jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></div>
        <p className="text-xs absolute text-gray-500 top-[-24px] left-16">
          <span className="text-orange-500 mr-2">BurhanRaja</span>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        </p>
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

export default ReplyChat;
