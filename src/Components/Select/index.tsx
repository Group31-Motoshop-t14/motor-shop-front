import { ReactNode, SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  register?: UseFormRegisterReturn;
  children: ReactNode;
}

const Select = ({ error, label, register, children, ...rest }: SelectProps) => {
  let componentClasses =
    "prose-text1 block w-full rounded-md border-2 border-grey7 bg-transparent p-4 outline-none transition hover:border-grey8 hover:bg-grey8 focus:border-Brand2 focus:bg-grey9 text-grey3";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={rest.id} className="prose-textBold2 text-grey1">
          {label}
        </label>
      )}
      <select
        {...rest}
        {...register}
        className={
          error
            ? (componentClasses +=
                " border-Alert1 placeholder-Alert1 hover:border-Alert1 hover:placeholder-grey3 focus:placeholder-grey3")
            : componentClasses
        }>
        <option value="">Selecione uma opção</option>
        {children}
      </select>
      ;
    </div>
  );
};

export default Select;
