import useGet from '@/hooks/useGet';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WarningModals from '@/components/ui/Modals/warning-modals';

export default function DashboardViews() {
    const { getData } = useGet();
    const [isToken, setIsToken] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsToken(localStorage.getItem('token'));
        }
    }, []);

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
            {data?.role !== 'admin' && (
                <WarningModals
                    title={'Access Denied'}
                    message={'You do not have permission to access this page'}
                    onClick={() => window.history.back()}
                />
            )}
            <div>Admin Dashboard</div>
        </>
    );
}
