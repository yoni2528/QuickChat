import React, { useState, useContext } from "react";

import { Input } from "../components";
import { UserContext } from "../../store/context";
import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";

const SignupForm: React.FC<{ onLogin: (token: string, action: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassowrd] = useState<string | undefined>();
  const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>();

  const [isFormValid, setIsFormValid] = useState(true);

  const { handleSignUp } = useDatabseRequests();
  const { handleSetUser, loginDetails } = useContext(UserContext);

  const handleEmailChange = (email: string) => {
    setEmail(email);
    return true;
  };

  const handlePasswordConfirmChangeValidate = (passwordConfirm: string) => {
    if (!passwordConfirm) return true;
    if (passwordConfirm !== password) return false;
    setPasswordConfirm(passwordConfirm);
    return true;
  };
  const handlePassowrdChangeValidate = (passowrd: string) => {
    if (!passowrd) return true;
    if (passowrd.length < 6) return false;
    if (passowrd.toLowerCase() === passowrd) return false;
    setPassowrd(passowrd);
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !passwordConfirm) {
      setIsFormValid(false);

      setTimeout(() => {
        setIsFormValid(true);
      }, 500);
      return;
    }
    const user = {
      email,
      password,
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
      className={`${handleSignUp.isSuccess ? "scale-0" : "scale-1"} ${
        isFormValid ? "" : "animate-[shake_0.3s]"
      }  transition duration-300 bg-[white] flex flex-col gap-4 rounded-lg`}
    >
      <Input
        onChangeAndValidate={handleEmailChange}
        defaultValue={loginDetails.email}
        placeholder={"Email"}
        type={"email"}
      ></Input>
      <Input
        onChangeAndValidate={handlePassowrdChangeValidate}
        defaultValue={loginDetails.password}
        invalidMessage={"Password must have more than 7 charcters and include at least one Capitalized letter"}
        placeholder={"Password"}
        type={"password"}
      ></Input>
      <Input
        onChangeAndValidate={handlePasswordConfirmChangeValidate}
        invalidMessage={"password must match"}
        placeholder={"Password Confirm"}
        type={"password"}
      ></Input>
      <button className="bg-secondary p-2 rounded-lg text-[white] col-span-2">SIGNUP</button>
    </form>
  );
};

export default SignupForm;
