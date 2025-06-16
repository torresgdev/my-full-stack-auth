import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
                <div className="text-center mt-6"> 
                    <Link 
                        to="/shopping-list" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 ease-in-out shadow-md"
                    >
                        🛒 Ver Minha Lista de Compras
                    </Link>
</div>          
            </div>
        </div>
    );
};

export default DashboardPage;