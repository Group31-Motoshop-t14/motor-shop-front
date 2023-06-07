"use client";
import React, { TextareaHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  register?: UseFormRegisterReturn;
}

const TextArea = ({ error, label, register, ...rest }: TextAreaProps) => {
  let componentClasses =
    "prose-text1 block w-full resize-none rounded-md border-2 border-grey7 bg-transparent p-4 outline-none transition hover:border-grey8 hover:bg-grey8 focus:border-Brand2 focus:bg-grey9";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={rest.id} className="prose-textBold2 text-grey1">
          {label}
        </label>
      )}
      <textarea
        {...rest}
        {...register}
        className={
          error
            ? (componentClasses +=
                " border-Alert1 placeholder-Alert1 hover:border-Alert1 hover:placeholder-grey3 focus:placeholder-grey3")
            : componentClasses
        }
      />
      ;
    </div>
  );
};

export default TextArea;
