import { cn } from '@/lib/utils';

export default function Form(props) {
    const { onSubmit, children, className } = props;
    return (
        <form
            onSubmit={onSubmit}
            className={cn('w-full flex flex-col gap-4', className)}
        >
            {children}
        </form>
    );
}
