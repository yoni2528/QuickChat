import React from "react";
import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";

import { AuthWrapper, SignupForm } from "../../components/index";

import { Link } from "react-router-dom";

const Signup: React.FC<{ handleLogin: (token: string, action: string) => void }> = ({ handleLogin }) => {
  const { handleSignUp } = useDatabseRequests();

  return (
    <AuthWrapper>
      <div
        className={`${
          handleSignUp.isSuccess ? "invisible opacity-0" : "visible opacity-1"
        } transition duration-300 bg-[white] p-10 w-full sm:w-1/2 flex flex-col items-left justify-center gap-4 animate-[enter_1s]`}
      >
        <h2 className="text-3xl text-primary_grey font-medium">Signup</h2>

        <SignupForm onLogin={handleLogin} />
        <p className="text-primary_grey">
          Already have user?{" "}
          <Link className="text-[#4943fa]" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
