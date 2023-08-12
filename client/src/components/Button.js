import React from "react";

function Button({
  title,
  variant = "contained",
  color = "primary",
  type = "button",
  onclick,
}) {
  let className = "w-100 py-1 ";
  if (variant === "contained") {
    className += "bg-" + color + ` text-white`;
  } else if (variant === "outlined") {
    className += "border-" + color + ` text` + color;
  }
  return (
    <button className={className} type={type} onclick={onclick}>
      {" "}
      {title}
    </button>
  );
}

export default Button;
