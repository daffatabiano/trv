import BaseLayout from '@/layout/BaseLayout';
import { cn } from '@/lib/utils';
import styles from '@/views/MainViews/style.module.scss';

export default function MainViews() {
    return (
        <BaseLayout>
            <div
                className={cn(
                    `text-3xl md:text-7xl font-bold  text-center`,
                    styles.title
                )}
            >
                <h1>
                    E N J O <span> Y O U R </span>T - R A V E L
                </h1>
            </div>
            <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                <p>Make Your Life Be More Fun</p>
            </div>
            <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                Debug now
            </button>
        </BaseLayout>
    );
}
