import React, {useState, useEffect } from "react";
import api from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import type { ShoppingListItem } from "../../types";
import ShoppingListAddItemForm from "./ShoppinListItemForm"; 

const ShoppingList: React.FC = () => {
    const { user, isAuthenticated } = useAuth();

    const [items, setItems] = useState<ShoppingListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 

    const fetchItems = async () => {
        if(!isAuthenticated || !user) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null); 
        try {
            const response = await api.get<ShoppingListItem[]>('/shopping-list'); 
            setItems(response.data);
        } catch (err) {
            console.error('Error ao buscar items da lista: ', err);
            setError('Não foi possível carregar a lista de compras. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        fetchItems();
    }, [isAuthenticated, user]); 

    const handleItemAdded = (newItem: ShoppingListItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const hangleTogglerPurchased = async (id: string, currentStatus: boolean) => { 
        try {
            const response = await api.patch<ShoppingListItem>(`/shopping-list/${id}`, {isPurchased: !currentStatus});
            setItems(items.map(item =>
                item.id === id ? {...item, isPurchased: response.data.isPurchased} : item
            ));
        } catch (err) {
            console.error('Erro ao atualizar item: ', err);
            setError('Não foi possível atualizar o status do item.'); 
        }
    };

    const handleRemoveItem = async (id: string) => {
        try {
            await api.delete(`/shopping-list/${id}`);
            setItems(items.filter(item => item.id !== id));
        } catch (err) {
            console.error('Error ao remover Item: ', err);
            setError('Não foi possível remover o item.'); 
        }
    };

    if (loading) {
        return <p className="text-center text-lg text-gray-600 mt-8">Carregando lista de compras...</p>;
    }


    return (
        <div className="mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md max-w-2xl mx-auto">

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Erro:</strong>
                    <span className="block sm:inline"> {error}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg onClick={() => setError(null)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.697l-2.651 2.652a1.2 1.2 0 1 1-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 1 1 1.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 0 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            )}
            

            <ShoppingListAddItemForm onItemAdded={handleItemAdded} />

            {items.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-4">Sua lista de compras está vazia. Adicione um item!</p>
            ): (
                <ul className="divide-y divide-gray-200 mt-4">
                    {items.map(item => (
                        <li key={item.id} className="flex justify-between items-center py-4">
                            <span
                                onClick={() => hangleTogglerPurchased(item.id, item.isPurchased)}
                                className={`flex-grow cursor-pointer text-lg p-2 rounded-md hover:bg-blue-50 transition duration-200 ease-in-out ${item.isPurchased ? 'line-through text-gray-500 italic' : 'text-gray-800'}`}>
                                {item.name} {item.quantity > 1 && <span className="text-sm text-gray-600">(x{item.quantity})</span>}
                            </span>

                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="ml-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-red-500 transition duration-200 ease-in-out">
                                Remover
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShoppingList;