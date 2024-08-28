import { cn } from '@/lib/utils';
import { Icons } from '../Icons';
import { useState } from 'react';
import styles from '@/components/ui/Input.module.scss';
import Label from './Label';
import { SUB_EMPTY_PROFILE, SUBT_EMPTY_IMAGE } from '@/services/SUB_DATA/data';

export default function Input(props) {
    const { className, text, ...rest } = props;

    return (
        <div>
            <Label text={text} className="ps-2" />
            <input
                className={cn(
                    'w-full p-2 text-white bg-neutral-100/30 outline-none shadow-sm shadow-neutral-200 rounded-full',
                    className
                )}
                {...rest}
            />
        </div>
    );
}

export const InputPassword = ({ name }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="-ms-2 me-2">
            <Label
                text={name === 'password' ? 'Password' : 'Confirm Password'}
                className="ps-4"
            />
            <div className="relative">
                <Input
                    className={styles.none}
                    type={show ? 'text' : 'password'}
                    name={name}
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

export const InputImage = (prop) => {
    const { image, onChange, clear } = prop;

    return (
        <div className="flex flex-col gap-4 relative p-4">
            <Label text="Choose Profile Picture" className="ps-2" />
            <img
                src={image.length > 0 ? image : SUB_EMPTY_PROFILE}
                alt={'profile-picture-user'}
                className="w-24 h-24 m-auto rounded-lg object-cover"
            />
            {image.length > 0 ? (
                <span
                    onClick={clear}
                    className="absolute bottom-0 right-0 w-10 h-10 p-3 text-rose-800 bg-rose-500/80 rounded-full"
                >
                    <Icons.Close w={20} />
                </span>
            ) : null}
            <Input
                type="file"
                name="profilePictureUrl"
                className="focus:outline-none file:hidden text-white"
                onChange={onChange}
            />
        </div>
    );
};
export const InputImagePoster = (prop) => {
    const { image, onChange, clear, title } = prop;

    return (
        <div className="flex flex-col gap-4 relative">
            <Label text={title} className="ps-2" />
            <img
                src={image}
                alt={'profile-picture-user'}
                className={`w-full h-full max-h-72 m-auto rounded-lg object-cover object-center ${
                    image?.length > 0 ? 'opacity-100' : 'opacity-80'
                }`}
            />
            {image.length > 0 ? (
                <span
                    onClick={clear}
                    className="absolute bottom-0 right-0 w-10 h-10 p-3 text-rose-800 bg-rose-500/80 rounded-full"
                >
                    <Icons.Close w={20} />
                </span>
            ) : null}
            <Input
                type="file"
                name="profilePictureUrl"
                className="focus:outline-none file:hidden text-white"
                onChange={onChange}
            />
        </div>
    );
};
