import useGet from '@/hooks/useGet';
import { useEffect, useState } from 'react';

export default function Activity() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const getActivity = async () => {
        const res = await getData('activities', token);
        setData(res.data.data);
    };

    console.log(data);

    useEffect(() => {
        getActivity();
    }, [token]);

    return (
        <div>
            <h1>Activity</h1>
        </div>
    );
}
