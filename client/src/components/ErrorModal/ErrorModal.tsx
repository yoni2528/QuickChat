import React, { useContext } from "react";
import { UserContext } from "../../store/context";

const ErrorModal = () => {
  const { error, handleSetError } = useContext(UserContext);

  const handleCloseError = () => {
    handleSetError({ isOpen: false });
  };

  return (
    <div
      className={`w-full h-[100vh] absolute top-0 backdrop-blur-sm flex items-center justify-center ${
        error.isOpen ? "static" : "hidden"
      } heigh-[100vh] bg-[#eeeeee1e]  `}
    >
      <div className="bg-white w-[300px] min-h-[200px] p-8 rounded-lg flex flex-col justify-center gap-3">
        <h3 className="text-2xl font-bold">{error.title}</h3>
        <p className="text-md mb-4 ">{error.error}</p>
        <button onClick={handleCloseError} className="bg-secondary p-2 rounded-lg text-[white] col-span-2">
          Ok, got it
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
