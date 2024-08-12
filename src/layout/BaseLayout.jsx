import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';
import Headers from './partials/Headers';

export default function BaseLayout({ children }) {
    return (
        <>
            <AuroraBackground>
                <Headers />
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
