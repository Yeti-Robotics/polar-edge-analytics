"use client";

import { type ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

const Button = ({ children, appName }: ButtonProps): JSX.Element => {
  return (
    <button
      className={`bg-black text-white rounded-lg outline-1 p-6`}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};

export default Button;
