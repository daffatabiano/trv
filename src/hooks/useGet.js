import { BASE_HEADERS, BASE_URL } from '@/services/BASE/data';
import axios from 'axios';

export default function useGet() {
    const getData = async (endpoint, token) => {
        try {
            const res = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: BASE_HEADERS(token),
            });
            return res;
        } catch (error) {
            return error;
        }
    };

    return { getData };
}
