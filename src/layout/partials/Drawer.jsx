import { Icons } from '@/components/Icons';
import { lists } from '@/services/Headers/data';
import { SUB_EMPTY_PROFILE } from '@/services/SUB_DATA/data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Drawer(props) {
    const [show, setShow] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const { pathname } = useRouter();
    const handleClick = () => {
        setShow((curr) => !curr);
        setDropdown(false);
    };

    const handleDropdown = () => {
        setDropdown((curr) => !curr);
    };

    return (
        <aside
            className={` gap-4 ${
                show
                    ? 'w-20 xs:w-[20%] sm:w-[15%] bg-amber-400/80'
                    : 'w-full  xs:w-3/4 sm:w-[40%] bg-amber-400'
            }  justify-between h-screen z-[100] fixed top-0 rounded-tr-3xl rounded-br-3xl transition-all duration-300`}
        >
            <div
                className={`w-full flex pt-2 h-[15%]  ${
                    show
                        ? 'justify-center'
                        : 'justify-between items-center pe-4'
                } items-center transition-all duration-300`}
            >
                {show ? (
                    <img
                        src="/img/logo/single-logo.png"
                        className={`overflow-hidden transition-all w-20 duration-300`}
                        alt="logo-company"
                    />
                ) : (
                    <img
                        src="/img/logo/sec-logo.png"
                        className={`overflow-hidden transition-all w-36 duration-300`}
                        alt="logo-company"
                    />
                )}

                <span
                    className={` text-white font-bold w-fit text-center p-1 xs:p-2 top-2 right-2 rounded-full bg-amber-300 `}
                    onClick={handleClick}
                >
                    {show ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
                </span>
            </div>
            <hr className="w-full h-[1px] border-amber-300" />
            <div className={`w-full h-[70%] px-2 py-8 flex flex-col gap-2`}>
                {lists.map((item) => (
                    <ul key={item.id} className="w-full ">
                        <li className=" w-full">
                            <Link
                                href={item.path}
                                className={`text-white w-full h-full rounded flex items-center gap-4 link py-4 px-2 ${
                                    item.path === pathname
                                        ? 'bg-gradient-to-l from-amber-400 to-amber-600 text-amber-950'
                                        : 'hover:bg-amber-600/30 '
                                } ${show ? 'justify-center' : 'justify-start'}`}
                                onClick={handleClick}
                            >
                                {item.icon}
                                {show ? '' : item.name}
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
            <hr className="w-full h-[1px] border-amber-300" />
            <div
                className={`w-full px-2 mt-4 h-[10%] flex justify-${
                    show ? 'center' : 'between'
                } items-center`}
            >
                <div className="flex gap-2">
                    <img
                        src={props.profilePictureUrl || SUB_EMPTY_PROFILE}
                        alt={`profile-picture-${props.name}`}
                        className="w-14 h-14 rounded-lg object-cover"
                    />
                    {!show ? (
                        <span className="flex flex-col text-white capitalize font-bold w-fit h-fit p-2 items-start text-center text-sm rounded-lg bg-gradient-to-l from-amber-400 to-amber-500 text-amber-950">
                            {props.name || 'Guest'}
                            <em className="font-normal normal-case">
                                {props.email || 'Empty Email'}
                            </em>
                        </span>
                    ) : null}
                </div>
                {!show ? (
                    <div className="w-1/6 ">
                        <button
                            onClick={handleDropdown}
                            className="text-white font-bold w-fit text-center text-sm p-2 top-2 right-2 rounded-full bg-amber-300 "
                        >
                            <Icons.ThreeDots />
                        </button>
                        {dropdown && (
                            <ul
                                className={`w-36 px-2 py-2 flex flex-col gap-2 absolute bottom-16 right-4 rounded-lg bg-amber-300 text-amber-950`}
                            >
                                <li className="w-full">
                                    <Link
                                        href="#"
                                        className="text-white w-full h-full rounded flex items-center gap-4 link p-2 hover:bg-amber-600/30 hover:text-amber-950"
                                        onClick={handleClick}
                                    >
                                        <Icons className={'w-5 h-5'}>
                                            <Icons.Cart w={20} />
                                        </Icons>
                                        My Book
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        onClick={handleClick}
                                        href="#"
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
                                        href={
                                            props.id
                                                ? '/auth/logout'
                                                : '/auth/login'
                                        }
                                        className={`${
                                            props
                                                ? 'text-red-600 hover:bg-red-600/30'
                                                : 'text-green-600 hover:bg-green-600/30'
                                        } w-full h-full rounded flex items-center gap-4 link p-2 `}
                                        onClick={handleClick}
                                    >
                                        {props ? (
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
                ) : null}
            </div>
        </aside>
    );
}
