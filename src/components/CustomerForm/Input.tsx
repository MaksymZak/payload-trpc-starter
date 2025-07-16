import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  label: string;
  name: string;
  type: "text" | "password" | "email";
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
};

export const Input = (props: Props) => {
  return (
    <div className={`flex flex-col gap-2`}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        defaultValue={props.defaultValue ? props.defaultValue : ""}
        required={props.required}
        className={cn(
          "rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none",
        )}
        name={props.name}
        type={props.type}
        placeholder={
          props.placeholder
            ? props.placeholder
            : `Enter your ${props.label.toLowerCase()}`
        }
      />
    </div>
  );
};
