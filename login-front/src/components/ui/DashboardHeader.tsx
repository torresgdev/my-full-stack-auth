import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

    return (
        <header className="bg-gradient-to-r from-purple-600 to-pink-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              
                <h1 className="text-2xl font-bold">
                    Meu Dashboard
                </h1>

              
                <div className="flex items-center space-x-4">
                    {user && ( 
                        <span className="text-lg">
                            Olá, <span className="font-semibold">{user.email}</span>!
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold p-2  rounded transition duration-300 ease-in-out"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;