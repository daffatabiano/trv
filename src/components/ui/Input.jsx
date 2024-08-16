import { cn } from '@/lib/utils';
import { Icons } from '../Icons';
import { useState } from 'react';
import styles from '@/components/ui/Input.module.scss';

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

    return (
        <div className="relative">
            <Input
                className={styles.none}
                type={show ? 'text' : 'password'}
                name="password"
                placeholder="Password"
            />
            <Icons
                onClick={() => setShow((curr) => !curr)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
            >
                {show ? <Icons.EyeOff /> : <Icons.Eye />}
            </Icons>
        </div>
    );
};
