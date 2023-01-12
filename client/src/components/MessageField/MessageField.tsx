import React, { useRef } from "react";

import { IoSendOutline } from "react-icons/io5";

const MessageField: React.FC<{ onMessageSend: (message: string) => void; selectedUser: string | undefined }> = ({
  onMessageSend,
  selectedUser,
}) => {
  const InputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!InputRef.current) return;
    if (!InputRef.current.value) return;

    onMessageSend(InputRef.current.value);
    InputRef.current.value = "";
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center">
      <input
        readOnly={selectedUser ? false : true}
        className="w-[90%] h-full focus:outline-none p-3"
        type={"text"}
        placeholder="type a message..."
        ref={InputRef}
      ></input>
      <button>
        <IoSendOutline className="w-6 h-6 text-[#54D38A]" />
      </button>
    </form>
  );
};

export default MessageField;
