const BASE_URL = 'http://localhost:3000';

export const registerUser = async (email: string, password: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ email, password}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falaha ao registrar usuário.');
    }

    return response.json();
}

export const loginUser = async (email: string, password:string): Promise<{access_token: string}> => {
    const response = await fetch(`${BASE_URL}/auth/login`,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password}),
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao fazer Login')
    }

    return response.json();
}
    
