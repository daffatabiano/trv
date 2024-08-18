import { useEffect, useState } from 'react';
import { SidebarAdmin } from './partials/SidebarAdmin';
import useGet from '@/hooks/useGet';

export default function AdminLayout({ children }) {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const getUser = async () => {
        const res = await getData('user', token);
        setData(res?.data?.data);
    };

    useEffect(() => {
        getUser();
    }, [token]);

    return <SidebarAdmin {...data}>{children}</SidebarAdmin>;
}
