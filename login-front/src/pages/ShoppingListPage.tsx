import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ShoppingList from "../components/ui/ShoppingList";
import DashboardHeader from "../components/ui/DashboardHeader";

const ShoppingListPage: React.FC =() => {
    const { isAuthenticated, loadingAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadingAuth && !isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, loadingAuth, navigate]);

    if (loadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-center text-lg text-gray-700">Carregando lista de compras ...</p>
            </div>
        )
    }

    return (
         <div className="min-h-screen bg-gray-100">
            
            <DashboardHeader /> 

            <main className="container mx-auto py-8 px-4">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Sua Lista de Compras</h1>
                <ShoppingList /> 
            </main>
        </div>
    )
}

export default ShoppingListPage;