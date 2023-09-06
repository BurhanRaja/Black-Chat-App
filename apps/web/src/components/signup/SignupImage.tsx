import React from "react";

const SignupImage = () => {
  return (
    <div
      className='w-[50%]'
      style={{
        backgroundImage: `url(./images/sideImage.jpg)`,
        height: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <Image src={sideImage} alt='Signup Image' className="w-[100%]" /> */}
    </div>
  );
};

export default SignupImage;
