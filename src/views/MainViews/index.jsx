import Button from '@/components/ui/Button';
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
                    className="relative flex flex-col gap-0 items-center justify-center w-full"
                >
                    <div
                        className={cn(
                            `text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold  `,
                            styles.contain__title
                        )}
                    >
                        <h1>
                            E N J O <span> Y O U R </span>T - R A V E L
                        </h1>
                    </div>
                    <div className="font-extralight text-base text-lg md:text-4xl dark:text-neutral-200 py-4">
                        <p>Make Your Life Be More Fun</p>
                    </div>
                    <Button
                        text={'Explore Now'}
                        type="button"
                        onClick={() => {}}
                    />
                </motion.div>
            </div>
            <BaseLayout>hello world</BaseLayout>
        </>
    );
}
