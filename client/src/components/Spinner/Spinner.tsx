import React, { useContext } from "react";

import { ImSpinner } from "react-icons/im";
import { UserContext } from "../../store/context";

const Spinner = () => {
  const { isSpinnerLoading } = useContext(UserContext);

  return (
    <div
      className={`w-full h-[100vh] absolute top-0 flex items-center justify-center ${
        isSpinnerLoading ? "static backdrop-blur-sm	" : "hidden"
      } heigh-[100vh] bg-[#eeeeee0] z-12 `}
    >
      <ImSpinner className="w-12 h-12 animate-spin text-secondary" />
    </div>
  );
};

export default Spinner;
