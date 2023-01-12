import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "../../store/context";
import { Input } from "../components";

import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";

const LoginForm: React.FC<{ onLogin: (token: string, action: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassowrd] = useState<string | undefined>();

  const { handleLogin } = useDatabseRequests();
  const { handleSetUser } = useContext(UserContext);

  const handleEmailValidate = () => {
    return true;
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePassowrdChange = (passowrd: string) => {
    setPassowrd(passowrd);
  };

  const handlePasswordValidate = () => {
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    handleLogin.mutateAsync(user).then((data) => handleSetUser(data.user));
  };

  useEffect(() => {
    if (handleLogin.isSuccess) {
      const token = handleLogin.data.user.token;
      localStorage.setItem("token", token);
      onLogin(token, "login");
    }
  }, [handleLogin.data]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-1">
        <Input
          onChange={handleEmailChange}
          onValidate={handleEmailValidate}
          placeholder={"Email"}
          type={"email"}
        ></Input>
      </div>
      <div className="flex flex-col gap-1">
        <Input
          onChange={handlePassowrdChange}
          onValidate={handlePasswordValidate}
          placeholder={"Password"}
          type={"password"}
        ></Input>
      </div>
      <button className="bg-secondary p-2 rounded-lg text-[white] hover:bg-secondary_tint">LOGIN</button>
    </form>
  );
};

export default LoginForm;
