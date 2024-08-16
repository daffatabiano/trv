import { AUTH_HEADERS, BASE_HEADERS, BASE_URL } from '@/services/BASE/data';
import axios from 'axios';

export default function useAuth() {
    const login = async (url, option) => {
        try {
            const resp = await axios.post(`${BASE_URL}/${url}`, option, {
                headers: AUTH_HEADERS,
            });
            return resp;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const logout = async (url, callback) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/${url}`, {
                headers: BASE_HEADERS,
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
