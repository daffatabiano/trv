import useGet from '@/hooks/useGet';
import { useEffect, useState } from 'react';
import WarningModals from '@/components/ui/Modals/warning-modals';
import AdminLayout from '@/layout/AdminLayout';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Dashboard() {
    const { getData } = useGet();
    const [isToken, setIsToken] = useState('');
    const [data, setData] = useState([]);
    const md = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsToken(localStorage.getItem('token'));
        }
    }, []);

    console.log(!md, 'mediaquery');

    const getProfile = async () => {
        try {
            const res = await getData('user', isToken);
            setData(res?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfile();
    }, [isToken]);

    return (
        <>
            {isToken && data?.role !== 'admin' ? (
                <WarningModals
                    title={'Access Denied'}
                    message={'You do not have permission to access this page'}
                    onClick={() => window.history.back()}
                />
            ) : null}
            {!md && (
                <WarningModals
                    title={'Only Desktop'}
                    message={
                        'You just can access this page with Computer or Laptop'
                    }
                    onClick={() => window.history.back()}
                />
            )}
            <AdminLayout>Admin Dashboard</AdminLayout>
        </>
    );
}
