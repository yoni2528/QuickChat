import React, { useContext } from "react";

import { ImSpinner } from "react-icons/im";
import { UserContext } from "../../store/context";

const Spinner = () => {
  const { isSpinnerLoading } = useContext(UserContext);

  return (
    <div
      className={`w-full h-[100vh] absolute top-0 flex items-center justify-center ${
        isSpinnerLoading ? "static" : "hidden"
      } heigh-[100vh] bg-[#eeeeee0]  `}
    >
      <ImSpinner className="w-10 h-10 animate-spin text-secondary" />
    </div>
  );
};

export default Spinner;
