import React, { useContext } from "react";

import { UserContext } from "../../store/context";

import { AuthWrapper, LoginForm } from "../../components/index";

import { Link } from "react-router-dom";

const Login: React.FC<{
  onLogin: any;
}> = ({ onLogin }) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <AuthWrapper>
      <div
        className={`${
          isLoggedIn ? "scale-0" : "scale-1"
        } transition duration-300 bg-[white] p-10 w-full sm:w-1/2 flex flex-col items-left justify-center gap-4 animate-[enter_1s]`}
      >
        <div className="flex flex-col">
          <h2 className="text-3xl text-primary_grey font-medium mb-2">Welcome to QuickChat</h2>
          <h2 className="text-md text-primary_grey  mb-2">login to start chatting with friends and family</h2>
        </div>
        <LoginForm onLogin={onLogin} />
        <p className="text-primary_grey">
          Don&apos;t have user yet?{" "}
          <Link className="text-[#4943fa]" to={"/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Login;
