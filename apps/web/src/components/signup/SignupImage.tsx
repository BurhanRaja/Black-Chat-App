import React, { FunctionComponent } from "react";
import Image from "next/image";

const SignupImage: FunctionComponent = () => {
  return (
    <div className='w-[50%]' style={{}}>
      <Image
        src={"/images/auth-img-2-1.png"}
        alt='Signup Image'
        width={640}
        height={400}
      />
    </div>
  );
};

export default SignupImage;
