import React from "react";

function FormRow({ label, name, type, placeholder }) {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={name} name={name} className="mb-1.5 text-base text-white">
        {label || name}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className="rounded-md p-2 bg-inherit ring-1 ring-white/20 outline-0 focus:ring-white/40 text-sm text-white/80"
      />
    </div>
  );
}

export default FormRow;
