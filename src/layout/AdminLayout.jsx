import { useEffect, useState } from 'react';
import { SidebarAdmin } from './partials/SidebarAdmin';
import useGet from '@/hooks/useGet';
import WarningModals from '@/components/ui/Modals/warning-modals';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function AdminLayout({ children }) {
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const md = useMediaQuery('(min-width: 768px)');

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

    return (
        <SidebarAdmin {...data}>
            {token && data?.role !== 'admin' ? (
                <WarningModals
                    title={'Access Denied'}
                    message={'You do not have permission to access this page'}
                    onClick={() => (window.location.href = '/home')}
                />
            ) : null}
            {!md && (
                <WarningModals
                    title={'Only Desktop'}
                    message={
                        'You just can access this page with Computer or Laptop'
                    }
                    onClick={() => (window.location.href = '/home')}
                />
            )}
            {children}
        </SidebarAdmin>
    );
}
