import BaseLayout from '@/layout/BaseLayout';

export default function MainViews() {
    return (
        <BaseLayout>
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                Background lights are cool you know.
            </div>
            <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                And this, is chemical burn.
            </div>
            <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                Debug now
            </button>
        </BaseLayout>
    );
}
