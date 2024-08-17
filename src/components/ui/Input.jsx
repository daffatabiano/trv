import { cn } from '@/lib/utils';
import { Icons } from '../Icons';
import { useState } from 'react';
import styles from '@/components/ui/Input.module.scss';
import Label from './Label';

export default function Input(props) {
    const { className, text, ...rest } = props;

    return (
        <div>
            <Label text={text} className="ps-2" />
            <input
                className={cn(
                    'w-full p-2 sm:p-4  bg-neutral-100/30 outline-none shadow-sm shadow-neutral-200 rounded-full',
                    className
                )}
                {...rest}
            />
        </div>
    );
}

export const InputPassword = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="-ms-2 me-2">
            <Label text="Password" className="ps-4" />
            <div className="relative">
                <Input
                    className={styles.none}
                    type={show ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                />
                <Icons
                    onClick={() => setShow((curr) => !curr)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
                >
                    {show ? <Icons.EyeOff /> : <Icons.Eye />}
                </Icons>
            </div>
        </div>
    );
};
