import React from "react";
import useForm from "../../hooks/useForm";
import api from "../../api/api";
import type { ShoppingListItem } from "../../types";

interface AddItemFormValues {
    name: string;
    quantity: string;
}

interface ShoppingListAddItemFormProps {
    onItemAdded: (item: ShoppingListItem) => void
}

const ShoppingListAddItemForm: React.FC<ShoppingListAddItemFormProps> = ({ onItemAdded }) => {
  const { values, errors, loading, handleChange, handleSubmit } = useForm<AddItemFormValues>(
    { name: '', quantity: '1' }, 
    {
      name: (value) => (!value.trim() ? 'O nome do item é obrigatório.' : null),
      quantity: (value) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 1) return 'A quantidade deve ser um número válido e maior que zero.';
        return null;
      },
    }
  );

  const handleAddItemSubmit = async (data: AddItemFormValues) => {
    try {
        const quantityNum = parseInt(data.quantity);
        const response = await api.post<ShoppingListItem>('/shopping-list', {
            name: data.name,
            quantity: quantityNum,
        });

        onItemAdded(response.data);

        values.name = '',
        values.quantity = '1'
    } catch (err) {
        console.error('Erro ao adicionar item: ', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleAddItemSubmit)} className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Nome do Item ..."
            required
            className="flex-gorw p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <input
            type="number"
            name="quantity"
            value={values.quantity}
            onChange={handleChange}
            min="1"
            className="w-24 p-3 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"/>

        <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
            disabled={loading}>
                {loading ? 'Adicionando ...' : 'Adicionar'}
        </button>
         {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
      {errors.quantity && <p className="text-red-500 text-xs italic mt-1">{errors.quantity}</p>}
    </form>
  )
}

export default ShoppingListAddItemForm;