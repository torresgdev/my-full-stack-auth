import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ShoppingList from "../components/ui/ShoppingList";
import type{ User } from "../types";
import { useAuth } from "../hooks/useAuth";

const DashboardPage: React.FC = () => {
    const {isAuthenticated, logout, user} = useAuth() as {isAuthenticated: boolean; logout: () => void; user:User | null}

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=> {
        if(!isAuthenticated) {
            navigate('/login')
        } else {
            setLoading(false)
        }

    }, [isAuthenticated, navigate])

    if (loading) {
        return <p className="text-center text-lg text-gray-600 mt-8">Carregando dashboard...</p>;
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                    Bem-vindo, <span className="text-blue-600">{user?.email || 'Usuário'}</span>!
                </h1>
                 <p className="text-xl text-gray-700 mb-10 text-center">Este é o seu dashboard pessoal.</p>

                  <ShoppingList />

                  <button
                    onClick={logout}
                    className="block w-fit mx-aut mt-12 px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 ease-in-out">
                        Sair
                    </button>
            </div>
        </div>
    )
};

export default DashboardPage;