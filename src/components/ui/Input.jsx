import { cn } from '@/lib/utils';

export default function Input(props) {
    const { className, ...rest } = props;

    return (
        <input
            className={cn(
                'w-full p-2 sm:p-4 md:p-6 bg-neutral-100/30 outline-none shadow-sm shadow-neutral-200 rounded-full',
                className
            )}
            {...rest}
        />
    );
}
