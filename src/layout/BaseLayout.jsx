import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import Headers from './partials/Headers';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Drawer from './partials/Drawer';

export default function BaseLayout({ children }) {
    const md = useMediaQuery('(min-width: 768px)');

    return (
        <>
            <AuroraBackground>
                {md ? <Headers /> : <Drawer />}
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
