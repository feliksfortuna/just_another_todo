import axios from 'axios';

const apiUrl = 'http://localhost:8000/api';


// Authentication services    
export const register = async (email: string, password: string, name: string, surname: string) => {
    try {
        const response = await axios.post(`${apiUrl}/register`, {
            email,
            password,
            name,
            surname,
        });
        return response.data;
    } catch (error) {
        return (error as any).response.data;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        return (error as any).response.data;
    }
}

// Todo services