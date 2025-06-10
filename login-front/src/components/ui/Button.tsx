import React from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
}

// COMPONENTE BUTTON

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    ...otherProps
}) => {
    // LÓGICA PARA ESTILOS DINÂMICOS
    const baseStyles = "font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out w-full";
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-200 hover>bg-gray-300 text-gray-800",
    };

    const isDisabled = isLoading || otherProps.disabled;

    const buttonClasses = `${baseStyles} ${variants[variant]} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
    }`;


    return (
     // BOTÃO PRINCIPAL
     <button className={buttonClasses}
        disabled={isDisabled}
        {...otherProps}>
        
        {isLoading ? (
            <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Carregando...
            </span>
        ): (
            children
        )}
        </button>
    )
}

export default Button;