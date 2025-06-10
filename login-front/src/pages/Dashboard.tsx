import React from "react";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
            <h1 className="text-5xl font-extrabold mb-6 animate-pulse">
                🎉 Bem-vindo! 🎉
            </h1>
            <p className="text-xl text-gray-300 mb-8">Você acessou sua dashboard com Sucesso</p>

            <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    Sair
                </Link>
        </div>
    )
};

export default DashboardPage;