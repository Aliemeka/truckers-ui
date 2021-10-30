import { FC, InputHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: boolean;
  description?: string;
  errorText?: string;
  horizontal?: boolean;
  className?: string;
}

export const InputGroup: FC<InputGroupProps> = ({
  className = "",
  label = "",
  name = "",
  type = "text",
  placeholder = "",
  error = false,
  errorText = "",
  description = "",
  horizontal = false,
  ...newProps
}) => {
  const hasError = error || errorText;
  const finalClass = `${className} w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400 ${
    hasError && `border-red-600`
  }`;
  return (
    <div className={horizontal ? "sm:flex sm:items-center" : ""}>
      {label && (
        <label
          className={`text-sm md:text-base mb-1 text-blue-600 ${
            hasError && "text-red-600"
          } ${horizontal && "sm:w-24"}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className={horizontal ? "sm:flex-1" : ""}>
        <input
          type={type}
          name={name}
          className={finalClass}
          placeholder={placeholder}
          {...newProps}
        />
        {description && (
          <span className="mt-2 text-gray-600 text-xs">{description}</span>
        )}
        {errorText && (
          <div className="bg-red-200 mt-2 py-2 px-4 text-xs text-red-600 rounded-sm">
            {errorText}
          </div>
        )}
      </div>
    </div>
  );
};
