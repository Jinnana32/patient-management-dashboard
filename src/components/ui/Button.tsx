import React, { type FC } from 'react';

interface WrappedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: FC<WrappedButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-gray-200 rounded ${props.className} `}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
};

export default Button;
