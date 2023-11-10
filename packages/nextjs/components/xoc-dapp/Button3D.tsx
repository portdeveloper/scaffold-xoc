import React, { useState } from "react";

type Button3DProps = {
  actionHandler: () => void;
  children: React.ReactNode;
};

const Button3D = ({ actionHandler, children }: Button3DProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    actionHandler();
  };

  const handleRelease = () => {
    setIsPressed(false);
  };

  return (
    <button
      className={`
        bg-green-500
        text-white
        py-4 px-8
        text-center
        text-decoration-none
        inline-block
        text-lg
        mx-2
        cursor-pointer
        transition-transform
        transform
        ${isPressed ? 'translate-y-2' : ''}
      `}
      onClick={handleClick}
      onMouseUp={handleRelease}
    >
      {children}
    </button>
  );
};

export default Button3D;