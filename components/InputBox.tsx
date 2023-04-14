import React, { FC } from "react";

interface InputBoxProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const InputBox: FC<InputBoxProps> = ({
  id,
  onChange,
  value,
  label,
  type,
}) => {
  return (
    <div className="relative mb-2">
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className="block rounded-md p-4 pb-1 w-full focus:ring-0 bg-neutral-600 text-slate-300 
                    text-md focus:outline-none appearance-none peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-md scale-75 -translate-y-3  text-zinc-300 top-2 left-2 duration-200 transform  
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                  peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};

export default InputBox;
