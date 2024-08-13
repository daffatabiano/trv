import { Icons } from '@/components/Icons';
import { lists } from '@/services/Headers/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Sidebar = ({ lists, show }) => {
    return (
        <aside
            className={`w-full xs:w-1/4 gap-4  bg-amber-400 justify-between h-screen z-[100] fixed top-0 rounded-tr-3xl rounded-br-3xl ${show} transition-all duration-300`}
        >
            <div className="w-full flex h-[20%] justify-center  items-center">
                <img
                    src="/img/logo/sec-logo.png"
                    className="w-full object-cover h-full"
                    alt="logo-company"
                />
                <span
                    className={`text-white font-bold w-fit text-center absolute text-sm p-2 top-2 right-2 rounded-full bg-amber-300 ${
                        show === 'translate-x-0'
                            ? '-translate-x-100'
                            : 'translate-x-0'
                    }`}
                >
                    x
                </span>
            </div>
            <div className="w-full h-[50%]  px-2 py-8 flex flex-col gap-4 justify-between items-center">
                {lists.map((item) => (
                    <ul key={item.id}>
                        <li>
                            <Link
                                href={item.path}
                                className="text-white flex items-center gap-2 link"
                            >
                                {item.icon} {item.name}
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
            <div className="w-full h-[10%] mt-24  justify-end items-end flex">
                <img src="/img/logo/main-logo.png" alt="logo-company" />
            </div>
        </aside>
    );
};

export default function Drawer() {
    const [show, setShow] = useState(true);
    const handleClick = () => {
        setShow((curr) => !curr);
    };

    return (
        <>
            <nav
                className={`${'flex'} w-full h-20 items-center justify-between z-20 backdrop-blur-md sticky top-0 text-slate-950 pe-4 pt-4`}
            >
                <div className="w-5/6 flex flex-col justify-start ">
                    <button
                        className="bg-amber-400 px-2 py-8 rounded-tr-full rounded-br-full  w-10 hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600"
                        onClick={handleClick}
                        id="btn-sidebar"
                    >
                        {show ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
                    </button>
                </div>
                <div className="w-1/6">
                    <img src="/img/logo/main-logo.png" alt="logo-company" />
                </div>
            </nav>
            <aside
                className={`w-full xs:w-1/2 gap-4  bg-amber-400 justify-between h-screen z-[100] fixed top-0 rounded-tr-3xl rounded-br-3xl transition-all duration-300`}
            >
                <div
                    className={`w-full bg-red-200 flex h-[20%] ${
                        show ? 'justify-center' : 'justify-between'
                    } items-center transition-all duration-300`}
                >
                    {show ? (
                        <img
                            src="/img/logo/sec-logo.png"
                            className={`overflow-hidden transition-all w-36 duration-300`}
                            alt="logo-company"
                        />
                    ) : (
                        <img
                            src="/img/logo/single-logo.png"
                            className={`overflow-hidden transition-all w-24 duration-300`}
                            alt="logo-company"
                        />
                    )}

                    <span
                        className={`text-white font-bold w-fit text-center text-sm p-2 top-2 right-2 rounded-full bg-amber-300 `}
                        onClick={handleClick}
                    >
                        {show ? <Icons.ChevronLeft /> : <Icons.ChevronRight />}
                    </span>
                </div>
                <div className="w-full h-[50%]  px-2 py-8 flex flex-col gap-4 justify-between items-center">
                    {lists.map((item) => (
                        <ul key={item.id}>
                            <li className="">
                                <Link
                                    href={item.path}
                                    className="text-white flex items-center gap-2 link"
                                >
                                    {item.icon} {item.name}
                                </Link>
                            </li>
                        </ul>
                    ))}
                </div>
                <div className="w-full h-[10%] mt-24  justify-end items-end flex">
                    <img src="/img/logo/main-logo.png" alt="logo-company" />
                </div>
            </aside>
        </>
    );
}
