"use client";

import forms from "../../styles/Forms.module.css";

export default function Input({
  label,
  name,
  value,
  type,
  onChange,
  placeholder,
}) {
  return (
    <div className={forms.inputContainer}>
      <div className={forms.labelContainer}>
        <label className={forms.label}>{label}</label>
      </div>
      <input
        className={forms.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

<input
  type="number"
  className={`${forms.input} xl:w-fit`}
  name="price"
  value={newItem.price}
  onChange={handleChange}
  placeholder="Price"
  required
/>;
