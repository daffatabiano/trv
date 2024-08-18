import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import Headers from './partials/Headers';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Drawer from './partials/Drawer';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useGet from '@/hooks/useGet';

export default function BaseLayout({ children }) {
    const md = useMediaQuery('(min-width: 768px)');
    const { pathname } = useRouter();
    const paths = ['/home', '/promo', '/popular'];
    const [isToken, setIsToken] = useState('');
    const { getData } = useGet();
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
            <AuroraBackground>
                <>
                    {paths.includes(pathname) &&
                        (md ? (
                            <Headers {...data} />
                        ) : (
                            <>
                                <Drawer {...data} />
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
        </>
    );
}
