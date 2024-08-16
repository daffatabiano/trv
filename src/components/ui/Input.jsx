import { cn } from '@/lib/utils';
import { Icons } from '../Icons';

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

export const InputPassword = () => {
    return (
        <div className="relative">
            <Input type="text" name="password" placeholder="Password" />
            <Icons className="absolute right-4 top-1/2 -translate-y-1/2">
                <Icons.Eye />
            </Icons>
        </div>
    );
};
