import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    error,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full text-left'>
            {label && (
                <label
                    className='inline-block mb-1.5 pl-1 text-xs font-semibold uppercase tracking-wider text-slate-300'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-4 py-2.5 rounded-xl bg-slate-900/80 text-slate-100 placeholder:text-slate-500 outline-none duration-200 border border-slate-700/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 w-full text-sm shadow-inner ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            {error && (
                <p className="mt-1 text-xs text-rose-400 pl-1">{error}</p>
            )}
        </div>
    )
})

export default Input;