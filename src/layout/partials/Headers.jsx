import styles from '@/layout/partials/styles.module.scss';
import { useEffect, useState } from 'react';
import { lists } from '@/services/Headers/data';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRouter } from 'next/navigation';
import { SUB_EMPTY_PROFILE } from '@/services/SUB_DATA/data';
import { Icons } from '@/components/Icons';

export default function Headers(props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const md = useMediaQuery('(max-width: 768px)');
    const { push } = useRouter();
    const [dropdown, setDropdown] = useState(false);

    const handleDropdown = () => {
        setDropdown((curr) => !curr);
    };

    useEffect(() => {
        const stickyTop = document.querySelector('.sticky');
        const handleScroll = () => {
            if (window.scrollY >= 1) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const take = props.name;
    let name = '';
    if (take) {
        name = take.slice(0, 12);
    }

    return (
        <nav
            className={`flex gap-4 w-full h-24 items-center bg-transparent backdrop-blur-md sticky top-0 px-4 pt-2 ${
                isScrolled ? 'shadow-sm' : ''
            }`}
        >
            <div className="w-[10%] xl:pt-8 lg:pt-6 md:pt-4">
                <img
                    className="w-full object-cover h-full"
                    src="/img/logo/main-logo.png"
                    alt="logo-company"
                />
            </div>
            <div className="w-10/12 flex gap-4 ">
                {lists.map((item) => (
                    <div key={item.id}>
                        <Link
                            href={item.path}
                            className={cn(
                                'text-xl text-amber-400 font-bold hover:text-amber-500 transition-all'
                            )}
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="w-2/12 me-4">
                {props.id ? (
                    <div className="flex gap-1 items-center w-full">
                        <p className="text-amber-400 font-medium italic w-full">
                            Hello,{' '}
                            <span className="text-stone-100 font-bold capitalize not-italic">
                                {name || 'Guest'}
                            </span>
                        </p>
                        <img
                            src={props.profilePictureUrl || SUB_EMPTY_PROFILE}
                            alt={`profile-picture-${props.name}`}
                            onClick={handleDropdown}
                            className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        />

                        {dropdown && (
                            <ul
                                className={`w-36 px-2 py-2 flex flex-col gap-2 absolute top-20 right-6 z-50 rounded-lg bg-amber-300 text-amber-950`}
                            >
                                <li className="w-full">
                                    <Link
                                        href="/my-book"
                                        className="text-white w-full h-full rounded flex items-center gap-4 link p-2 hover:bg-amber-600/30 hover:text-amber-950"
                                        onClick={handleDropdown}
                                    >
                                        <Icons className={'w-5 h-5'}>
                                            <Icons.Cart w={20} />
                                        </Icons>
                                        My Book
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        onClick={handleDropdown}
                                        href="/dashboard"
                                        className="text-white w-full h-full rounded flex items-center gap-4 link p-2 hover:bg-amber-600/30 hover:text-amber-950"
                                    >
                                        <Icons className={'w-5 h-5'}>
                                            <Icons.Dashboard w={20} />
                                        </Icons>
                                        Dashboard
                                    </Link>
                                </li>
                                <hr />
                                <li className="w-full">
                                    <Link
                                        href={props.id ? '' : '/auth/login'}
                                        className={`${
                                            props.id
                                                ? 'text-red-600 hover:bg-red-600/30'
                                                : 'text-green-600 hover:bg-green-600/30'
                                        } w-full h-full rounded flex items-center gap-4 link p-2 `}
                                        onClick={props.id ? props.logout : ''}
                                    >
                                        {props.id ? (
                                            <>
                                                <Icons className={'w-5 h-5'}>
                                                    <Icons.Logout />
                                                </Icons>
                                                Logout
                                            </>
                                        ) : (
                                            <>
                                                <Icons className={'w-5 h-5'}>
                                                    <Icons.Login />
                                                </Icons>
                                                Login
                                            </>
                                        )}
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Button
                        text="Login"
                        type="button"
                        onClick={() => {
                            push('/auth/login');
                        }}
                    />
                )}
            </div>
        </nav>
    );
}
