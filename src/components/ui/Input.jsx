import { cn } from '@/lib/utils';
import { Icons } from '../Icons';
import { useState } from 'react';

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
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow((s) => !s);

    return (
        <div className="relative">
            <Input
                type={show ? 'text' : 'password'}
                name="password"
                placeholder="Password"
            />
            <Icons className="absolute right-4 top-1/2 -translate-y-1/2">
                {show ? (
                    <Icons.EyeOff onClick={toggleShow} />
                ) : (
                    <Icons.Eye onClick={toggleShow} />
                )}
            </Icons>
        </div>
    );
};
