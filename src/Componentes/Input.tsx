
import React from 'react';

const Input = ({ label, error, ...props }) => {
  return (

    <div className="mb-4">
      <label htmlFor={props.id} className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>

    
  );
};

export default Input;
