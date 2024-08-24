import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import Headers from './partials/Headers';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Drawer from './partials/Drawer';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useGet from '@/hooks/useGet';
import useAuth from '@/hooks/useAuth';
import Toast from '@/components/ui/Toast';

export default function BaseLayout({ children }) {
    const md = useMediaQuery('(min-width: 768px)');
    const { pathname } = useRouter();
    const paths = ['/home', '/promo', '/popular'];
    const [isToken, setIsToken] = useState('');
    const { getData } = useGet();
    const [data, setData] = useState([]);
    const [toast, setToast] = useState({});
    const { logout } = useAuth();

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
    const handleLogout = async () => {
        try {
            const res = await logout('logout', isToken);
            if (res.status === 200) {
                setToast({
                    variant: 'success',
                    title: 'Logout Success',
                    message: res.data.message,
                    show: true,
                });
                setTimeout(() => {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('token');
                    }
                    window.location.href = '/auth/login';
                }, 3000);
            }
        } catch (error) {
            setToast({
                variant: 'error',
                title: 'Logout Failed',
                message: error?.response?.data?.message,
                show: true,
            });
        }
    };

    useEffect(() => {
        getProfile();
    }, [isToken]);

    return (
        <>
            {!paths.includes(['/dashboard/**']) ? (
                <AuroraBackground>
                    <Toast {...toast} setToast={setToast} duration={3000} />
                    <>
                        {paths.includes(pathname) &&
                            (md ? (
                                <Headers {...data} logout={handleLogout} />
                            ) : (
                                <>
                                    <Drawer {...data} logout={handleLogout} />
                                    <div className="w-20 xs:w-[20%] sm:w-[15%] bg-transparent h-screen" />
                                </>
                            ))}
                    </>
                    <motion.div
                        initial={{ opacity: 0.0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: 'easeInOut',
                        }}
                        className="relative flex flex-col gap-4 items-center justify-center w-full "
                    >
                        {children}
                    </motion.div>
                </AuroraBackground>
            ) : (
                <>{children}</>
            )}
        </>
    );
}
