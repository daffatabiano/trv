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

    if (data?.role !== 'admin') {
        return (
            <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                        type: 'spring',
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001,
                    },
                }}
            >
                <WarningModals
                    title="Access Denied"
                    message="You do not have permission to access this page"
                />
            </motion.div>
        );
    }

    return (
        <>
            <div>Admin Dashboard</div>
        </>
    );
}
