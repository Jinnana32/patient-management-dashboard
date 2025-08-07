import React, { type FC } from 'react';

interface WrappedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: FC<WrappedButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-green-500 text-white',
    secondary: 'bg-gray-200 text-gray-800',
  };
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${variantClasses[variant]} ${props.className} `}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
};

export default Button;
