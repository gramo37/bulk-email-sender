import { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const label = props.placeholder ?? "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full p-2 mb-4">
      <input
        {...props}
        ref={inputRef}
        className={`block w-full px-3 py-2 text-sm border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          `}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=" "
      />
      <label
        className={`absolute left-3 text-gray-500 duration-200 transform -translate-y-1/2 top-1/2 z-20 px-2 rounded-sm
          ${isFocused || props.value ? "text-xs top-2 bg-white" : "text-sm"}`}
        onClick={handleFocus}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
