
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://my-auth-backend-595w.onrender.com'; 

export const registerUser = async (email: string, password: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/auth/signup`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao registrar usuário.');
    }

    return response.json();
}


export const loginUser = async (email: string, password: string): Promise<{ accessToken: string; user: { id: string; email: string } }> => {
    const response = await fetch(`${BASE_URL}/auth/signin`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao fazer Login');
    }

    return response.json(); 
}