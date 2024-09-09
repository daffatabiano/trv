import { BASE_HEADERS, BASE_URL } from '@/services/BASE/data';

export default function useDelete() {
  const deleteData = async (url, token) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${url}`, {
        headers: BASE_HEADERS(token),
      });
      return res;
    } catch (error) {
      return error;
    }
  };
  return { deleteData };
}
