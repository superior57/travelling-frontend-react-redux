import React from "react";

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => {
  return type === "textarea" ? (
    <div className={`FormRow ${type}`}>
      <label htmlFor={id} className={`FormRowLabel ${type}`}>
        {label}
      </label>
      <textarea
        className="FormRowInput"
        id={id}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        rows="5"
      />
    </div>
  ) : (
    <div className={`FormRow ${type}`}>
      <label htmlFor={id} className={`FormRowLabel ${type}`}>
        {label}
      </label>
      <input
        className={`FormRowInput ${type}`}
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Field;
