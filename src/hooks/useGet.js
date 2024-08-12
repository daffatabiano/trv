import { AUTH_HEADERS, BASE_URL } from '@/services/BASE/data';

export default function useGet() {
    const getData = async (endpoint) => {
        try {
            const res = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: AUTH_HEADERS,
            });
            return res;
        } catch (error) {
            return error;
        }
    };

    return { getData };
}
