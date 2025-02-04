import React from 'react';

const Button = ({ children, isLoading, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg ${isLoading && 'opacity-50 cursor-not-allowed'}`}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
