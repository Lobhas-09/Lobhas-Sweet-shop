import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';

export const useAuth = () => {
    // @ts-ignore
    const { setUser } = useContext(AuthContext);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const register = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.post('/auth/register', { username, password });
            setUser(response.data.user);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.post('/auth/login', { username, password });
            setUser(response.data.user);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return { register, login, logout, error, loading };
};