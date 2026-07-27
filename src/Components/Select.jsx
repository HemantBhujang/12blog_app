import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full text-left'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='inline-block mb-1.5 pl-1 text-xs font-semibold uppercase tracking-wider text-slate-300'
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-2.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-700/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none duration-200 w-full text-sm appearance-none cursor-pointer ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-slate-900 text-slate-100">
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);