import { BASE_URL } from '@/services/BASE/data';

export default function useDelete() {
    const deleteData = async (url, options) => {
        try {
            const res = await axios.delete(`${BASE_URL}/${url}`, {
                headers: {
                    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res;
        } catch (error) {
            return error;
        }
    };
    return { deleteData };
}
