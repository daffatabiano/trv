import { AUTH_HEADERS, BASE_HEADERS, BASE_URL } from '@/services/BASE/data';
import axios from 'axios';

export default function useAuth() {
    const login = async (url, option) => {
        const resp = await axios.post(`${BASE_URL}/${url}`, option, {
            headers: AUTH_HEADERS,
        });
        return resp;
    };

    const logout = async (url, callback, token) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/${url}`, {
                headers: BASE_HEADERS(token),
            });
            if (url === 'logout') {
                localStorage.removeItem('token');
                callback(response);
            } else if (url === 'user') {
                callback(response.data.data);
            } else if (url === 'all-user') {
                callback(response.data.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return { login, logout };
}
