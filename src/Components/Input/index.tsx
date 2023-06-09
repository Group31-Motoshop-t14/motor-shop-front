"use client";
import React, { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  register?: UseFormRegisterReturn;
}

const Input = ({ error, label, register, ...rest }: InputProps) => {
  let componentClasses =
    "prose-body-2-400! block! w-full rounded-md border-2! border-grey7! bg-transparent! p-4! outline-none! transition! hover:border-grey8! hover:bg-grey8! focus:border-Brand2! focus:bg-grey9! placeholder-grey3!";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={rest.id} className="prose-body-2-600 text-grey1">
          {label}
        </label>
      )}
      <input
        {...rest}
        {...register}
        className={
          error
            ? (componentClasses +=
                " border-Alert1 placeholder-Alert1 hover:border-Alert1 hover:placeholder-grey3 focus:placeholder-grey3")
            : componentClasses
        }
      />
      {error ? <span className="prose-body-2-500 text-red-900">{error}</span> : null}
    </div>
  );
};

export default Input;
