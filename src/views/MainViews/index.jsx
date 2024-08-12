import BaseLayout from '@/layout/BaseLayout';
import { cn } from '@/lib/utils';
import styles from '@/views/MainViews/style.module.scss';
import { motion } from 'framer-motion';

export default function MainViews() {
    return (
        <>
            <div className={styles.contain}>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center w-full"
                >
                    <div
                        className={cn(
                            `text-3xl md:text-7xl font-bold  `,
                            styles.contain__title
                        )}
                    >
                        <h1>
                            E N J O <span> Y O U R </span>T - R A V E L
                        </h1>
                    </div>
                    <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                        <p>Make Your Life Be More Fun</p>
                    </div>
                    <button className="bg-amber-300 rounded-full w-fit text-emerald-950 font-bold px-4 py-2 hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600 ">
                        Explore Now
                    </button>
                </motion.div>
            </div>
            <BaseLayout>hello world</BaseLayout>
        </>
    );
}
