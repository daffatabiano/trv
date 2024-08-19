import useGet from '@/hooks/useGet';
import { useState, useEffect } from 'react';

export default function Profile() {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const getProfile = async () => {
        const res = await getData('user', token);
        setData(res);
    };

    console.log(Data);

    useEffect(() => {
        getProfile;
    }, [token]);

    return (
        <div className="bg-slate-500">
            <h1>Profile</h1>
        </div>
    );
}
