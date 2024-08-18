import { AUTH_HEADERS, BASE_HEADERS, BASE_URL } from '@/services/BASE/data';
import axios from 'axios';

export default function useAuth() {
    const auth = async (url, option) => {
        const resp = await axios.post(`${BASE_URL}/${url}`, option, {
            headers: AUTH_HEADERS,
        });
        return resp;
    };

    const logout = async (url, token) => {
        try {
            const response = await axios.get(`${BASE_URL}/${url}`, {
                headers: BASE_HEADERS(token),
            });
            return response;
        } catch (error) {
            return error;
        }
    };
    return { auth, logout };
}
