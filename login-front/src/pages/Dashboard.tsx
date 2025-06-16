import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingList from "../components/ui/ShoppingList";
import DashboardHeader from "../components/ui/DashboardHeader"; 
import { useAuth } from "../hooks/useAuth"; 

const DashboardPage: React.FC = () => {

    const { isAuthenticated, loadingAuth } = useAuth(); 
    const navigate = useNavigate();

    
    useEffect(() => {
       
        if (!loadingAuth && !isAuthenticated) {
            navigate('/login'); 
        }
    }, [isAuthenticated, loadingAuth, navigate]);

    
    if (loadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-center text-lg text-gray-600">Carregando dashboard...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-center text-lg text-red-600">Você precisa estar logado para acessar esta página.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100"> {/* Cor de fundo para toda a tela */}
            <DashboardHeader /> {/* O seu header no topo da página */}
            
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl mt-8 p-8"> {/* Container principal do conteúdo */}
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Bem-vindo ao seu Painel!</h2>
                <ShoppingList /> {/* Seu componente de lista de compras */}
            </div>
        </div>
    );
};

export default DashboardPage;