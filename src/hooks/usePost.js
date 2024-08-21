import { BASE_HEADERS, BASE_URL } from '@/services/BASE/data';
import axios from 'axios';

export default function usePost() {
    const post = async (url, body, token) => {
        try {
            const res = await axios.post(`${BASE_URL}/${url}`, body, {
                headers: BASE_HEADERS(token),
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    return { post };
}
