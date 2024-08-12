import { BASE_URL, UPLOAD_HEADERS } from '@/services/BASE/data';
import axios from 'axios';

export default function useUpload() {
    const upload = async (url, body) => {
        try {
            const res = await axios.post(`${BASE_URL}/${url}`, body, {
                headers: UPLOAD_HEADERS,
            });
            return res;
        } catch (err) {
            return err;
        }
    };
    return { upload };
}
