import { BASE_HEADERS } from '@/services/BASE/data';

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
