import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600 hover:bg-indigo-500",
    textColor = "text-white",
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-md shadow-indigo-500/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}