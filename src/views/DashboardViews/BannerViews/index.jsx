import useGet from '@/hooks/useGet';
import { useEffect, useState } from 'react';

export default function Banner() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const getBanner = async () => {
        const res = await getData('banners', token);
        setData(res.data.data);
    };

    useEffect(() => {
        getBanner();
    }, [token]);
    return (
        <div>
            <h1>Banner</h1>
        </div>
    );
}
