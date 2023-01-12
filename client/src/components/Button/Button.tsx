import React from "react";

const Button: React.FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-white">
      Create Channel
    </button>
  );
};

export default Button;
