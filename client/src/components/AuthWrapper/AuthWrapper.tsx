import React from "react";

import Auth from "../../assets/auth.jpg";

type Props = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-[100vh] bg-[#eee] flex items-center justify-center">
      <div className="w-[80%] sm:w-[80%] md:w-[60%] h-[70%] flex items-stretch  rounded-lg overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${Auth})`,
          }}
          className="hidden sm:w-1/2 sm:flex h-100 bg-center bg-cover "
        ></div>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
