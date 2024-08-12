import { Icons } from '@/components/Icons';
import { lists } from '@/services/Headers/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Sidebar = ({ lists, show }) => {
    return (
        <aside
            id="sidebar"
            className={`w-full xs:w-1/4 gap-4  bg-amber-400 justify-between h-screen z-[100] fixed top-0 rounded-tr-3xl rounded-br-3xl ${show} transition-all duration-300`}
        >
            <div className="w-full h-[25%]">
                <img src="/img/logo/sec-logo.png" alt="logo-company" />
            </div>
            <div className="w-full h-[50%]  px-2 py-8 flex flex-col gap-4 justify-between items-center">
                {lists.map((item) => (
                    <ul key={item.id}>
                        <li>
                            <Link
                                href={item.path}
                                className="text-white flex items-center gap-2"
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
    const [showDrawer, setShowDrawer] = useState('-translate-x-[100px]');

    const handleClick = () => {
        setShowDrawer('translate-x-0');
    };

    useEffect(() => {
        const sidebar = document.querySelector('#sidebar');
        sidebar.addEventListener('click', () => {
            setShowDrawer('-translate-x-[100px]');
        });
    }, []);

    return (
        <>
            <Sidebar show={showDrawer} lists={lists} />
            <nav
                className={`${'flex'} w-full h-20 items-center justify-between z-20 backdrop-blur-md sticky top-0 text-slate-950 pe-4 pt-4`}
            >
                <div className="w-5/6 flex flex-col justify-start ">
                    <button
                        className="bg-amber-400 px-2 py-8 rounded-tr-full rounded-br-full  w-10 hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600"
                        onClick={handleClick}
                        id="btn-sidebar"
                    >
                        <Icons.Hamburger />
                    </button>
                </div>
                <div className="w-1/6">
                    <img src="/img/logo/main-logo.png" alt="logo-company" />
                </div>
            </nav>
            <aside className=" w-[10%] fixed top-0 h-screen flex flex-col gap-4 justify-between py-36 items-start ">
                {lists.map((item) => (
                    <button
                        className="bg-amber-400 px-2 py-8 rounded-tr-full rounded-br-full  hover:bg-amber-400 hover:translate-y-1 hover:shadow-inner hover:shadow-amber-600"
                        key={item.id}
                    >
                        {item.icon}
                    </button>
                ))}
            </aside>
        </>
    );
}
