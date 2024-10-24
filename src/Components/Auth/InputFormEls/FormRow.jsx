import React from "react";

function FormRow({ label, name, type, placeholder, handleChange, value }) {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={name} name={name} className="mb-1.5 text-base text-white">
        {label || name}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-md p-2 bg-inherit ring-1 ring-white/20 outline-0 focus:ring-white/40 text-sm text-white/80"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

export default FormRow;
