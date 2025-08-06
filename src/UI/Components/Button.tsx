import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  action: MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({text, action}) => {
  return (
    <button
      onClick={action}
      style={{
        backgroundColor: "#3498db",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: "6px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#2980b9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#3498db";
      }}
    >
    {text}
  </button>
  );
};

export default Button;