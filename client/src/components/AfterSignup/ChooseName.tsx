import React, { useState, useContext } from "react";
import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";

import { Input } from "../components";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../../store/context";

const ChooseName = () => {
  const [nameInput, setName] = useState<string>();

  const { handleSetUser } = useContext(UserContext);

  const navigate = useNavigate();

  const { handleUpdateUserDetails } = useDatabseRequests();

  const handleNameChange = (value: string) => {
    if (!value) return true;
    if (value.length > 20) return false;
    setName(value);
    return true;
  };

  const handleNameSubmit = (e: any) => {
    e.preventDefault();
    handleUpdateUserDetails.mutateAsync({ nickName: nameInput }).then((data) => {
      handleSetUser(data.user);
    });
    navigate("/chat");
  };

  return (
    <div className="animate-[enter_0.5s]">
      <form onSubmit={handleNameSubmit}>
        <Input
          invalidMessage="Name must be shorter than 20 charcters"
          onChangeAndValidate={handleNameChange}
          placeholder="Name here..."
          type="text"
        ></Input>
      </form>
    </div>
  );
};

export default ChooseName;
