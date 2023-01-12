import React, { useState, useContext } from "react";

import { Input } from "../components";
import { UserContext } from "../../store/context";
import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";

const SignupForm: React.FC<{ onLogin: (token: string, action: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassowrd] = useState<string | undefined>();
  const [nickName, setNickName] = useState<string | undefined>();
  const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>();

  const { handleSignUp } = useDatabseRequests();
  const { handleSetUser } = useContext(UserContext);

  const handleEmailValidate = () => {
    return true;
  };
  const handleEmailChange = (email: string) => {
    setEmail(email);
  };
  const handleNickNameChange = (email: string) => {
    setNickName(email);
  };
  const handlePasswordConfirmChange = (email: string) => {
    setPasswordConfirm(email);
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
      nickName,
      passwordConfirm,
    };

    handleSignUp.mutateAsync(user).then((data) => {
      onLogin(data.user.token, "signup");
      handleSetUser(data.user);
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`${
        handleSignUp.isSuccess ? "scale-0" : "scale-1"
      } transition duration-300 bg-[white] flex flex-col gap-4 rounded-lg`}
    >
      <Input onChange={handleEmailChange} onValidate={handleEmailValidate} placeholder={"Email"} type={"email"}></Input>
      <Input
        onChange={handleNickNameChange}
        onValidate={handlePasswordValidate}
        placeholder={"Full Name"}
        type={"nickName"}
      ></Input>
      <Input
        onChange={handlePassowrdChange}
        onValidate={handlePasswordValidate}
        placeholder={"Password"}
        type={"password"}
      ></Input>
      <Input
        onChange={handlePasswordConfirmChange}
        onValidate={handlePasswordValidate}
        placeholder={"Password Confirm"}
        type={"password"}
      ></Input>
      <button className="bg-secondary p-2 rounded-lg text-[white] col-span-2">SIGNUP</button>
    </form>
  );
};

export default SignupForm;
