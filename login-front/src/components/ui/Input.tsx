import React from "react";
import type { InputHTMLAttributes } from "react";

// INTERFACE DE PROPRIEDADES (PROPS)
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { 
    label?: string;
    error?: string | null;
}

// COMPONENTE INPUT
const Input: React.FC<InputProps> = ({label, error, ...otherProps}) => {
    return (
        <div className="mb-4 w-full">

            {label && (
                <label htmlFor="{otherProps.id}" className="block text-gray-700 text-sm font-semibold mb-2">
                    {label}
                </label>
            )}

        
            <input {...otherProps}
                className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${error ? 'border-red-500' : 'border-gray-300'}`}  />

        {error && (
            <p className="text-red-800 text-sm mt-1">{error}</p>
        )}  
        </div>
    )
}

export default Input;